# Everything on one box

One box. A cheap 4-core ARM machine. It runs everything I have ever shipped and it is boring. Four months of uptime, a third of the disk used, memory basically empty. The box is barely awake. Until the disk, the CPU, or the memory is actually full, a second machine is just a second thing to understand.

People will tell you you need Kubernetes. A CI pipeline. A container registry. A managed Postgres that bills you by the hour. For a handful of side projects. This is insane. You need a reverse proxy and a little discipline. That is the whole stack.

## caddy is the entire front end

One process is on the internet. Caddy. It does TLS for you, gets the certs, renews them, forwards each domain to something on localhost. No certbot. No renewal cron. No 3am page because a cert expired. You write down a domain, you get HTTPS. Done.

It runs as a container in `network_mode: host` so it grabs `:80` and `:443` directly, no port-mapping in the way. The certs live in a volume, so rebuilding the container does not throw them away and re-fetch. A rebuild that forgets that volume spends the afternoon talking to a CA for names you already proved last month.

```
services:
  caddy:
    build: .
    network_mode: host
    restart: unless-stopped
    volumes:
      - caddy_data:/data            # ACME account + certs survive rebuilds
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - ./www:/srv/www:ro

volumes:
  caddy_data:
```

The config is one file. The host symlinks to it, so `caddy reload` over the admin API on `:2019` hot-swaps it live with zero dropped connections, and the container reads the same file on boot. One file, two ways in.

And the file is tiny. Static site, point at a folder. App, point at a port. Streaming, turn off buffering.

```
static.example.com {
    root * /srv/www/site
    file_server
    encode gzip
}

app.example.com {
    # static shell + an API backend, one host
    handle /api/*/stream {
        reverse_proxy localhost:4000 {
            flush_interval -1         # do not buffer server-sent events
        }
    }
    handle /api/* {
        reverse_proxy localhost:4000
    }
    handle {
        root * /var/www/app
        file_server
    }
    encode gzip
}
```

One rule: name your hosts. I turned on on-demand TLS once so any subdomain would just work. Then bots started hammering random names and Caddy went and tried to get a real cert for every one of them. The CA has a limit. I burned it on garbage. Dumb. List the domains you actually own and move on.

## two shapes, that is it

Everything on the box is one of two things.

Already in Docker? It is a compose file in a folder.

```
services:
  app:
    build: .
    ports:
      - "127.0.0.1:3000:3000"       # localhost only, never 0.0.0.0
    env_file: [.env]
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

Not in Docker? It is a systemd unit. Same deal. Start after the database, shut down without dropping requests.

```
[Unit]
After=postgresql.service network.target
Requires=postgresql.service          # do not start before the database

[Service]
WorkingDirectory=/opt/app
Environment=DATABASE_URL=postgres://app:app@localhost/app
ExecStart=/opt/app/.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 --timeout-keep-alive 300
Restart=always
RestartSec=5
KillSignal=SIGINT                    # let it drain in-flight requests
TimeoutStopSec=10

[Install]
WantedBy=multi-user.target
```

Both end up identical. A process on localhost, started after what it needs, restarted when it dies, sitting behind Caddy. Docker versus systemd is a detail. Nobody cares which one. The system is the same shape either way.

## the firewall is decoration

This is the part that lets me not think about it. Caddy is on `:80` and `:443`. Everything else, every app, every worker, the database, binds `127.0.0.1`. Nothing else is reachable from the outside, period. You cannot hack a port that was never opened. The firewall is there for show. One service bound to `0.0.0.0` by habit and the show is the only door.

## postgres is just running

Postgres is on the box. Not a container, not managed, not a line item on a bill. It listens on `127.0.0.1`, apps connect to `localhost`, and the units wait for it before they start. That is the entire database strategy.

Backup is `pg_dump` on a timer. One command, one file, copy it off the box. A dump that sits next to the database dies with the disk. The restore test is whether I can build the app again on an empty machine from that file. You do not need a managed cluster for an app doing ten requests a minute. You need a cron job and a second place the file can live.

## my laptop, but public

Sometimes I want a real URL pointing at code running on my Mac. A webhook while I am still building it, a quick demo, something I have not deployed and might never.

So the laptop opens a reverse tunnel. `ssh -R 9000:localhost:3000 box` parks a port on the server that forwards back to my desk. Then it is just another Caddy line.

```
dev.example.com {
    reverse_proxy localhost:9000     # rides the tunnel to my laptop
}
```

Public HTTPS on one end, my laptop on the other. The webhook hits the URL, Caddy does TLS, the request rides the tunnel home. I own both ends and it costs nothing.

## deploys are boring on purpose

Pull, rebuild, restart. `git pull && docker compose up -d --build`, or `git pull && systemctl restart app`. A config-only change to the proxy is `caddy reload` and nothing even goes down. No pipeline, no registry, no waiting on a runner in someone else's datacenter. One box means one copy of the code is live. There is no fleet to drift.

A deploy should be the most boring thing that happens all day.

## what I don't run

No Kubernetes. No Terraform. No CI platform charging me by the minute. No service mesh, no load balancer, no autoscaler for traffic that fits in the corner of one CPU.

The box has been up for months and it is barely awake. When it actually is not enough, I will buy a bigger box. That day is much further away than the internet wants you to believe.
