<script>
  import { fade, fly } from 'svelte/transition';
  
  let isOpen = $state(false);
  
  function toggleCard() {
    isOpen = !isOpen;
    playClickSound();
  }
  
  function playClickSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = isOpen ? 523.25 : 392.00;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log("AudioContext не поддерживается");
    }
  }
  
  function handleClose(e) {
    e.stopPropagation();
    if (isOpen) {
      isOpen = false;
        playClickSound();
    }
  }
</script>

<div class="card-container">
  <div 
    class="card-wrapper" 
    class:open={isOpen}
    onclick={toggleCard}
    role="button"
    tabindex="0"
  >
    <!-- Передняя обложка -->
    <div class="card-cover card-front">
      <div class="cover-title">Для Тебя 💝</div>
      <div class="cover-subtitle">самому специальному человеку</div>
      <div class="cover-heart">❤️</div>
      <div class="cover-subtitle">нажми, чтобы открыть</div>
    </div>
    
    <!-- Задняя обложка -->
    <div class="card-cover card-back">
      <div style="color: white; text-align: center; padding: 20px;">
        <div style="font-size: 1.5rem; margin-bottom: 10px;">❤️</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">С любовью</div>
      </div>
    </div>
    
    <!-- Внутреннее содержимое -->
    {#if isOpen}
      <div class="card-inside" transition:fade={{ duration: 300 }}>
        <button class="close-btn" onclick={handleClose}>
          <i class="fas fa-times"></i>
        </button>
        
        <div class="inside-content">
          
          <div class="content-wrapper">
            <!-- Галерея -->
           
            
            <!-- Текстовый блок -->
            <div class="text-block">
              <h3 class="message-title">Моё послание для тебя</h3>
              <p class="message-text">
                Каждый день с тобой наполнен теплом и светом. Ты делаешь обычные моменты особенными, а простые дни - праздником.
              </p>
              <p class="message-text">
                Спасибо тебе за каждую улыбку, за каждый смех, за каждое мгновение, проведенное вместе.
              </p>
              <div class="signature">С любовью, Афля 💛</div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .card-container {
    width: 100%;
    max-width: 400px;
    height: 500px;
    perspective: 1200px;
    margin: 20px auto;
    position: relative;
  }

  .card-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
  }

  .card-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 
      0 15px 35px rgba(255, 105, 180, 0.2),
      0 5px 15px rgba(255, 105, 180, 0.1);
  }

  .card-front {
    background: linear-gradient(145deg, #ff7eb9, #ff5d9e);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    text-align: center;
    transform: rotateY(0deg);
    z-index: 2;
    transform-origin: left center;
    transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card-wrapper.open .card-front {
    transform: rotateY(-160deg);
  }

  .card-back {
    background: linear-gradient(145deg, #ff5d9e, #ff3385);
    transform: rotateY(180deg);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-inside {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 12px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: inset 0 0 20px rgba(255, 105, 180, 0.1);
    transform: rotateY(0deg);
    left: 0;
    top: 0;
    z-index: 1;
  }

  .cover-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: white;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 1px;
  }

  .cover-subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
    margin-bottom: 25px;
  }

  .cover-heart {
    font-size: 3.5rem;
    animation: heartbeat 1.5s ease-in-out infinite;
    margin: 15px 0;
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.1); }
    30% { transform: scale(1); }
    45% { transform: scale(1.1); }
    60% { transform: scale(1); }
  }

  .inside-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-right: 5px;
  }

  .inside-title {
    font-size: 1.8rem;
    color: #ff5d9e;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 700;
  }

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .photo-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 10px;
  }

  .photo-frame {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 1/1;
    background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border: 2px solid #ffebf3;
    transition: all 0.3s ease;
  }

  .photo-frame:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 105, 180, 0.15);
  }

  .photo-icon {
    font-size: 2.8rem;
    color: #ff7eb9;
    margin-bottom: 12px;
  }

  .photo-label {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
    padding: 0 10px;
    font-weight: 500;
  }

  .text-block {
    background: linear-gradient(to right, rgba(255, 126, 185, 0.08), rgba(255, 93, 158, 0.04));
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid #ff7eb9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .message-title {
    color: #ff5d9e;
    font-size: 1.4rem;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .message-text {
    font-size: 1.05rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 10px;
  }

  .signature {
    text-align: right;
    color: #ff7eb9;
    font-style: italic;
    font-weight: 500;
    margin-top: 15px;
    font-size: 1.1rem;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #ff5d9e;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    display: none;
  }

  .close-btn:hover {
    background: #ff3385;
    transform: scale(1.1);
  }

  .inside-content::-webkit-scrollbar {
    width: 6px;
  }

  .inside-content::-webkit-scrollbar-track {
    background: rgba(255, 126, 185, 0.1);
    border-radius: 3px;
  }

  .inside-content::-webkit-scrollbar-thumb {
    background: #ff7eb9;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    .close-btn {
      display: block;
    }
  }

  @media (max-width: 480px) {
    .card-container {
      height: 450px;
      max-width: 320px;
    }
    
    .cover-title {
      font-size: 1.8rem;
    }
    
    .cover-subtitle {
      font-size: 1rem;
    }
    
    .inside-title {
      font-size: 1.5rem;
    }
    
    .photo-container {
      gap: 10px;
    }
    
    .photo-icon {
      font-size: 2.2rem;
    }
    
    .text-block {
      padding: 15px;
    }
    
    .message-title {
      font-size: 1.2rem;
    }
    
    .message-text {
      font-size: 1rem;
    }
  }

  @media (max-width: 350px) {
    .card-container {
      height: 400px;
      max-width: 280px;
    }
    
    .photo-container {
      grid-template-columns: 1fr;
    }
    
    .photo-frame {
      aspect-ratio: 16/9;
    }
  }

  @supports (-webkit-touch-callout: none) {
    .card-wrapper {
      -webkit-transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;
    }
  }
</style>