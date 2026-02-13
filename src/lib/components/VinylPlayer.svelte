<script>
  import { onMount } from 'svelte';
  
  let { currentTrack, isPlaying, onPlayPause } = $props();
  
  let vinyl = $state(null);
</script>

<div class="vinyl-container">
  <div 
    class="vinyl" 
    class:playing={isPlaying}
    bind:this={vinyl}
    onclick={onPlayPause}
    role="button"
    tabindex="0"
  >
    <div class="vinyl-grooves"></div>
    <div class="vinyl-label">
      <i class="fas fa-heart"></i>
      <span>❤️ LOVE</span>
    </div>
  </div>
  <div class="vinyl-shadow"></div>
  
  <div 
    class="play-button" 
    class:playing={isPlaying}
    onclick={onPlayPause}
  >
    <i class="fas fa-{isPlaying ? 'pause' : 'play'}"></i>
  </div>
</div>

<style>
  .vinyl-container {
    width: 280px;
    height: 280px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    z-index: 30;
    cursor: pointer;
  }

  @media (min-width: 400px) {
    .vinyl-container {
      width: 320px;
      height: 320px;
    }
  }

  @media (min-width: 500px) {
    .vinyl-container {
      width: 360px;
      height: 360px;
    }
  }

  .vinyl {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #222, #0a0a0a);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.6),
      0 5px 15px rgba(0, 0, 0, 0.4),
      inset 0 -5px 15px rgba(255, 255, 255, 0.1),
      inset 0 5px 15px rgba(0, 0, 0, 0.5);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 8px solid rgba(30, 30, 30, 0.9);
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .vinyl.playing {
    animation: spin 8s linear infinite;
    box-shadow: 
      0 25px 50px rgba(255, 51, 133, 0.4),
      0 10px 25px rgba(255, 51, 133, 0.3),
      inset 0 -5px 15px rgba(255, 182, 193, 0.2),
      inset 0 5px 15px rgba(0, 0, 0, 0.6);
    border-color: #ff3385;
  }

  .vinyl-label {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 40%, #ff7eb9, #ff3385);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: 
      0 0 20px rgba(255, 51, 133, 0.6),
      inset 0 -2px 5px rgba(0, 0, 0, 0.2),
      inset 0 2px 5px rgba(255, 255, 255, 0.3);
    border: 3px solid rgba(255, 255, 255, 0.6);
    position: relative;
    z-index: 40;
  }

  .vinyl-label i {
    font-size: 2.5rem;
    margin-bottom: 5px;
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
  }

  .vinyl-label span {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .vinyl-grooves {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: repeating-radial-gradient(
      circle at 50% 50%,
      transparent 0,
      transparent 8px,
      rgba(255, 255, 255, 0.03) 9px,
      rgba(0, 0, 0, 0.1) 10px
    );
  }

  .vinyl-shadow {
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: -20px;
    left: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.3) 0%, transparent 70%);
    filter: blur(8px);
    z-index: 20;
  }

  .play-button {
    position: absolute;
    bottom: -15px;
    right: 20px;
    background: linear-gradient(145deg, #ff5d9e, #ff3385);
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    box-shadow: 
      0 10px 20px rgba(255, 51, 133, 0.4),
      0 0 0 5px rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    z-index: 50;
    cursor: pointer;
  }

  .play-button:hover {
    transform: scale(1.1);
  }

  .play-button.playing {
    background: linear-gradient(145deg, #ff3385, #b3245c);
  }

  @media (max-width: 350px) {
    .vinyl-container {
      width: 240px;
      height: 240px;
    }
    
    .vinyl-label {
      width: 70px;
      height: 70px;
    }
  }
</style>