<script>
  import { scale } from 'svelte/transition';
  
  let { top = '0px', left = '0px', delay = 0, temporary = false } = $props();
</script>

<div 
  class="heart" 
  style="top: {top}; left: {left}; animation-delay: {delay}s;"
  transition:scale={{ duration: temporary ? 400 : 0 }}
>
  ❤️
</div>

<style>
  .heart {
    position: absolute;
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.5rem;
    z-index: 1;
    animation: float 6s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
    }
  }
  
  @media (max-width: 768px) {
    .heart {
      font-size: 1.2rem;
    }
  }
</style>