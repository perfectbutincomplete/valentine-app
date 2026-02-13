import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',  // ← ВАЖНО для SPA роутинга
      precompress: false,
      strict: true
    }),
    
    // Для деплоя в GitHub Pages под путём /valentine-app
    paths: {
      base: '/valentine-app'
    },
    
    appDir: 'app'
  }
};

export default config;