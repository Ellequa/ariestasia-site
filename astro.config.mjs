// @ts-check
import { defineConfig } from 'astro/config';

// Set this build variable to the confirmed HTTPS origin before public launch.
const site = process.env.SITE_URL?.trim();
if (site) {
  const url = new URL(site);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || ['localhost', '127.0.0.1'].includes(url.hostname)) {
    throw new Error('SITE_URL must be a public HTTPS origin with no path, query or credentials.');
  }
}

export default defineConfig({
  site: site || undefined,
  vite: {
    server: {
      // Fail instead of silently starting a second preview on a different port.
      strictPort: true,
      // Native file events on H: miss added public assets, leaving Vite's index stale.
      watch: { usePolling: true, interval: 500 },
    },
  },
});
