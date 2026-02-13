<script>
  import { fade } from 'svelte/transition';
  import ValentineHeader from '$lib/components/ValentineHeader.svelte';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let sections = [
    { id: 'love', icon: 'heart', label: 'Любовь', path: '/' },
    { id: 'date', icon: 'calendar-alt', label: 'Дата', path: '/date' },
    { id: 'music', icon: 'music', label: 'Музыка', path: '/music' },
    { id: 'photos', icon: 'camera', label: 'Фото', path: '/photos' }
  ];

  // ✅ БЕЗ ФУНКЦИИ! Просто derived значение
  let activeSection = $derived.by(() => {
    const path = $page.url.pathname;
    if (path === '/') return 'love';
    
    const section = sections.find(s => s.path !== '/' && path.startsWith(s.path));
    return section ? section.id : 'love';
  });

  function handleNavClick(section) {
    goto(section.path);
  }
</script>

<svelte:head>
  <title>С Днём Святого Валентина!</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<div class="valentine-app">
  <ValentineHeader />
  
  <main>
    <div class="content">
      <slot />
    </div>
  </main>
  
  <!-- ✅ ПЕРЕДАЁМ activeSection БЕЗ () -->
  <BottomNav {sections} {activeSection} onnavigate={(e) => handleNavClick(e.detail)} />
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Manrope', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #fff5f7;
    color: #333;
    line-height: 1.6;
    min-height: 100vh;
  }

  .valentine-app {
    padding-bottom: 80px;
  }
  
  .content {
    max-width: 1000px;
    margin: 3rem auto;

    text-align: center;
  }
</style>