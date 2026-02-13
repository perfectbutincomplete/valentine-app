<script>
  let { 
    track, 
    isPlaying, 
    currentTime = 0, 
    duration = 0,
    onPlayPause,
    onPrev,
    onNext,
    onSeek
  } = $props();
  
  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  let progress = $derived((currentTime / duration) * 100 || 0);
  
  function handleProgressClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * duration;
    onSeek?.(newTime);
  }
</script>

<div class="track-info">
  <div class="track-title">{track.title}</div>
  <div class="track-artist">{track.artist}</div>
  
  <div class="progress-container">
    <div class="progress-bar" onclick={handleProgressClick}>
      <div class="progress-fill" style="width: {progress}%"></div>
    </div>
    <div class="time-info">
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>
  </div>
  
  <div class="controls">
    <button class="control-btn" onclick={onPrev}>
      <i class="fas fa-backward"></i>
    </button>
    <button class="control-btn play-pause" onclick={onPlayPause}>
      <i class="fas fa-{isPlaying ? 'pause' : 'play'}"></i>
    </button>
    <button class="control-btn" onclick={onNext}>
      <i class="fas fa-forward"></i>
    </button>
  </div>
</div>

<style>
  .track-info {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 24px;
    width: 100%;
    margin-top: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 30;
  }

  .track-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  .track-artist {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 16px;
    font-weight: 300;
    letter-spacing: 1px;
  }

  .progress-container {
    width: 100%;
    margin: 20px 0 10px;
  }

  .progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, #ff7eb9, #ff3385);
    border-radius: 3px;
    position: relative;
    transition: width 0.1s linear;
  }

  .progress-fill::after {
    content: '';
    position: absolute;
    right: -4px;
    top: -4px;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff3385;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .progress-bar:hover .progress-fill::after {
    opacity: 1;
  }

  .time-info {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin: 20px 0 10px;
  }

  .control-btn {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .control-btn:active {
    transform: scale(0.9);
    background: rgba(255, 51, 133, 0.4);
  }

  .control-btn.play-pause {
    width: 70px;
    height: 70px;
    font-size: 2rem;
    background: linear-gradient(145deg, #ff5d9e, #ff3385);
    border: 2px solid rgba(255, 255, 255, 0.6);
  }
</style>