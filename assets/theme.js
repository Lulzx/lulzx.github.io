(() => {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;
  const apply = dark => {
    document.documentElement.classList.toggle('dark', dark);
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    button.textContent = dark ? '◐' : '◑';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#1d221e' : '#eeefea';
  };
  let dark = false;
  try { const saved = localStorage.getItem('theme'); dark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches); } catch {}
  apply(dark);
  button.addEventListener('click', () => {
    dark = !document.documentElement.classList.contains('dark');
    apply(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  });
})();
