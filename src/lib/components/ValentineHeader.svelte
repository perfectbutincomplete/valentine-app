<script>
  import { fly, scale } from 'svelte/transition';
  import FloatingHeart from './FloatingHeart.svelte';

  let hearts = $state([
    { id: 1, top: '20px', left: '5%', delay: 0 },
    { id: 2, top: '60px', left: '90%', delay: 1 },
    { id: 3, top: '40px', left: '80%', delay: 2 },
    { id: 4, top: '100px', left: '15%', delay: 3 },
    { id: 5, top: '150px', left: '70%', delay: 4 },
    { id: 6, top: '80px', left: '30%', delay: 5 }
  ]);

  let dynamicHearts = $state([]);
  let nextId = $state(hearts.length + 1);

  function addHeart(event) {
    if (event.target.closest('.nav-btn')) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newHeart = {
      id: nextId++,
      top: `${y}px`,
      left: `${x}px`,
      delay: 0,
      temporary: true
    };

    dynamicHearts = [...dynamicHearts, newHeart];

    // Удаляем сердечко после анимации
    setTimeout(() => {
      dynamicHearts = dynamicHearts.filter(h => h.id !== newHeart.id);
    }, 6000);
  }

  function handleButtonClick(buttonName) {
    console.log(`Выбрано: ${buttonName}`);
  }
</script>

<header class="valentine-header" onclick={addHeart}>
  <!-- Декоративные статичные сердечки -->
  {#each hearts as heart (heart.id)}
    <FloatingHeart {...heart} />
  {/each}

  <!-- Динамические сердечки при клике -->
  {#each dynamicHearts as heart (heart.id)}
    <FloatingHeart {...heart} temporary={true} />
  {/each}
  
  <div class="header-content" in:fly={{ y: -50, duration: 800, delay: 200 }}>
    <h1 class="main-title" in:scale={{ duration: 600, delay: 400 }}>
      С Днём Святого Валентина, Айдана!❤️
    </h1>
    <!-- <p class="subtitle" in:fly={{ y: 20, duration: 600, delay: 600 }}>
      Любовь — это самое прекрасное чувство, которое делает нашу жизнь ярче и счастливее
    </p> -->
    
    <div class="nav-container" in:fly={{ y: 20, duration: 600, delay: 800 }}>
      <button class="nav-btn" onclick={() => handleButtonClick('Моё послание')}>
        <i class="fas fa-heart"></i>
        <span>Моё послание</span>
      </button>
      <button class="nav-btn" onclick={() => handleButtonClick('Подарки')}>
        <i class="fas fa-gift"></i>
        <span>Подарки</span>
      </button>
      <button class="nav-btn" onclick={() => handleButtonClick('Свидание')}>
        <i class="fas fa-calendar-alt"></i>
        <span>Свидание</span>
      </button>
    </div>
  </div>
</header>

<style>
  .valentine-header {
    background: linear-gradient(135deg, #ff9cd3 0%, #ff7eb9 50%, #ff5d9e 100%);
    color: white;
    padding: 1.5rem 2rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(255, 94, 158, 0.3);
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 8px solid #ff3385;
    cursor: pointer;
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .main-title {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 1px;
  }
  
  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    margin-bottom: 1.5rem;
    max-width: 600px;
    opacity: 0.95;
  }
  
  .nav-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .nav-btn {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.4);
    padding: 0.7rem 1.5rem;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  
  .nav-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .nav-btn:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    .valentine-header {
      padding: 1.2rem 1.5rem;
      min-height: 180px;
    }
    
    .main-title {
      font-size: 2.2rem;
    }
    
    .subtitle {
      font-size: 1.1rem;
      margin-bottom: 1.2rem;
    }
    
    .nav-container {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .valentine-header {
      padding: 1rem;
      min-height: 160px;
    }
    
    .main-title {
      font-size: 1.8rem;
    }
    
    .subtitle {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
</style>