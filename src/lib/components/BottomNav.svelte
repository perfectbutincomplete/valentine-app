<script>
  import { fly } from 'svelte/transition';
  
  let { sections = [], activeSection = 'love', onnavigate } = $props();
  
  function handleClick(section) {
    onnavigate?.(new CustomEvent('navigate', { detail: section }));
  }
</script>

<nav class="bottom-nav" transition:fly={{ y: 100, duration: 600, delay: 1000 }}>
  <div class="bottom-nav-items">
    {#each sections as section (section.id)}
      <button
        class="nav-item"
        class:active={activeSection === section.id}
        onclick={() => handleClick(section)}
      >
        <i class="fas fa-{section.icon}"></i>
        <span>{section.label}</span>
      </button>
    {/each}
  </div>
</nav>
<style>
  .bottom-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to right, #ff7eb9, #ff5d9e);
    padding: 0.8rem 1rem;
    z-index: 1000;
    box-shadow: 0 -5px 20px rgba(255, 94, 158, 0.3);
    border-top: 3px solid #ff3385;
  }
  
  .bottom-nav-items {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex: 1;
    max-width: 80px;
    cursor: pointer;
  }
  
  .nav-item i {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-item span {
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .nav-item:hover, .nav-item.active {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
  
  .nav-item:hover i {
    transform: scale(1.2);
  }

  .nav-item.active {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .nav-item.active i {
    transform: scale(1.3);
  }
  
  @media (max-width: 768px) {
    .bottom-nav {
      display: block;
    }
  }
  
  @media (max-width: 480px) {
    .bottom-nav {
      padding: 0.6rem 0.8rem;
    }
    
    .nav-item {
      padding: 0.4rem;
    }
    
    .nav-item i {
      font-size: 1.1rem;
    }
    
    .nav-item span {
      font-size: 0.7rem;
    }
  }

  /* Улучшение для iOS */
  @supports (-webkit-touch-callout: none) {
    .bottom-nav {
      padding-bottom: calc(0.8rem + env(safe-area-inset-bottom));
    }
    
    .nav-item {
      -webkit-appearance: none;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0.3);
    }
  }
</style>