<!-- src/routes/date/+page.svelte (или где у тебя Date) -->
<script>
  import { fade } from 'svelte/transition';
  import DecorativeHearts from '$lib/components/DecorativeHearts.svelte';
  import LoveCounter from '$lib/components/LoveCounter.svelte';
  import LoveLine from '$lib/components/LoveLine.svelte';

  // Стартовая дата
  const startDate = new Date(2024, 10, 21, 16, 0, 0); // 21 ноября 2024, 16:00
  
  // Логика счетчика времени
  let now = $state(new Date());

  $effect(() => {
    const id = setInterval(() => {
      now = new Date();
    }, 1000);
    
    return () => clearInterval(id);
  });

  const diff = $derived.by(() => {
    const delta = Math.max(0, now - startDate);
    
    const days = Math.floor(delta / 86400000);
    const hours = Math.floor(delta / 3600000) % 24;
    const minutes = Math.floor(delta / 60000) % 60;
    const seconds = Math.floor(delta / 1000) % 60;

    return { days, hours, minutes, seconds };
  });
</script>

<section class="date" in:fade>
  <DecorativeHearts />

  <h2 class="title">Мы вместе уже</h2>

  <LoveCounter 
    days={diff.days} 
    hours={diff.hours} 
    minutes={diff.minutes} 
    seconds={diff.seconds} 
  />

  <p class="since">
    с 21 ноября, 16:00 (примерно)
    <span class="heart-icon">❤️</span>
  </p>

  <LoveLine />
</section>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }

  .date {
    text-align: center;
    padding: 2.5rem 1.5rem;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 252, 0.98) 100%);
    border-radius: 32px;
    box-shadow: 
      0 20px 40px rgba(255, 94, 158, 0.12),
      0 8px 16px rgba(255, 94, 158, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    max-width: 900px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 182, 193, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .date::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, 
      #ff7eb9 0%, 
      #ff9acd 25%, 
      #ffb3d9 50%, 
      #ff9acd 75%, 
      #ff7eb9 100%);
    border-radius: 32px 32px 0 0;
  }

  .title {
    color: #ff3385;
    font-size: clamp(1.8rem, 5vw, 2.8rem);
    margin-bottom: 2.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(255, 51, 133, 0.1);
  }

  .since {
    color: #ff7eb9;
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    margin-bottom: 2.5rem;
    font-weight: 500;
    position: relative;
    z-index: 1;
    background: linear-gradient(135deg, #ff9acd 0%, #ff7eb9 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 182, 193, 0.4);
  }

  .heart-icon {
    animation: heartbeat 1.5s ease-in-out infinite;
    display: inline-block;
    margin-left: 0.5rem;
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.1); }
    30% { transform: scale(1); }
    45% { transform: scale(1.1); }
    60% { transform: scale(1); }
  }

  /* iOS/Safari оптимизации */
  @supports (-webkit-touch-callout: none) {
    .date {
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Адаптивность для мобильных */
  @media (max-width: 768px) {
    .date {
      padding: 2rem 1.2rem;
      border-radius: 24px;
    }
  }

  @media (max-width: 480px) {
    .date {
      padding: 1.8rem 1rem;
    }

    .since {
      font-size: 1.1rem;
      padding: 0.4rem 1.2rem;
    }
  }
</style>
