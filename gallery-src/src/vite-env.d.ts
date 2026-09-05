/// <reference types="vite/client" />
// The registry component guards dev-only assertions on NODE_ENV; Vite inlines it at build.
declare const process: { env: { NODE_ENV: string } }
