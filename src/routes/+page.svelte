<script>
  import { fade } from 'svelte/transition';
  import ValentineCard from '$lib/components/ValentineCard.svelte';
  import DecorativeHearts from '$lib/components/DecorativeHearts.svelte';
</script>

<div class="page-wrapper">
  <section class="home" in:fade>
    <DecorativeHearts />
    
    <div class="welcome-section">
      <h1 class="title">С Днём Святого Валентина! 💖</h1>
      <p class="subtitle">Для самого особенного человека</p>
    </div>
    
    <ValentineCard />
    
    <div class="bottom-message">
      <p class="instruction">
        <i class="fas fa-hand-pointer"></i>
        Нажми на открытку, чтобы открыть послание
      </p>
    </div>
  </section>
</div>

<style>
  .page-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .home {
    text-align: center;
    padding: 2.5rem 1.5rem;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 252, 0.98) 100%);
    border-radius: 32px;
    box-shadow: 
      0 20px 40px rgba(255, 94, 158, 0.12),
      0 8px 16px rgba(255, 94, 158, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    width: 100%;
    margin: 3rem auto;
    position: relative;
    overflow: visible;
    border: 1px solid rgba(255, 182, 193, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    min-height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .home::before {
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

  .welcome-section {
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }

  .title {
    color: #ff3385;
    font-size: clamp(1.8rem, 5vw, 2.8rem);
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(255, 51, 133, 0.1);
  }

  .subtitle {
    color: #ff7eb9;
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    font-weight: 500;
    background: linear-gradient(135deg, #ff9acd 0%, #ff7eb9 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .bottom-message {
    margin-top: 2rem;
    position: relative;
    z-index: 1;
  }

  .instruction {
    color: #ff7eb9;
    font-size: 1rem;
    padding: 10px 20px;
    background: rgba(255, 126, 185, 0.1);
    border-radius: 50px;
    display: inline-block;
  }

  .instruction i {
    margin-right: 8px;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @supports (-webkit-touch-callout: none) {
    .home {
      -webkit-overflow-scrolling: touch;
    }
  }

  @media (max-width: 768px) {
    .page-wrapper {
      padding: 0 0.5rem;
    }

    .home {
      padding: 2rem 1rem;
      border-radius: 24px;
      min-height: 650px;
      margin: 2rem auto;
    }

    .welcome-section {
      margin-bottom: 1.5rem;
    }

    .bottom-message {
      margin-top: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .home {
      padding: 1.8rem 0.8rem;
      min-height: 600px;
      margin: 1.5rem auto;
    }

    .instruction {
      font-size: 0.9rem;
      padding: 8px 16px;
    }
  }
</style>