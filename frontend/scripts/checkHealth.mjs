(async () => {
  try {
    const res = await fetch('http://localhost:8000/health');
    const j = await res.json();
    console.log('HTTP', res.status, JSON.stringify(j));
  } catch (e) {
    console.error('fetch error:', e && e.message ? e.message : e);
    process.exitCode = 1;
  }
})();
