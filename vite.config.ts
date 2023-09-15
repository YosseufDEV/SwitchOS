import { ssr } from 'solid-js/web';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  plugins: [solidPlugin(), solidSvg()],
  server: {
    watch: {
        usePolling: true,
    },
    port: 8080,
  },
  build: {
    target: 'es16',
  },
});
