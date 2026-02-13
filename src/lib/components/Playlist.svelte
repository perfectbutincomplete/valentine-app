<script>
  let { tracks, currentTrackIndex, onSelectTrack } = $props();
</script>

<div class="playlist">
  <div class="playlist-title">
    <i class="fas fa-music"></i>
    Романтический плейлист
  </div>
  <div class="playlist-items">
    {#each tracks as track, index}
      <div 
        class="playlist-item"
        class:active={index === currentTrackIndex}
        onclick={() => onSelectTrack(index)}
      >
        <div class="playlist-item-img">
          <i class="fas fa-{track.icon || 'music'}"></i>
        </div>
        <div class="playlist-item-info">
          <div class="playlist-item-title">{track.title}</div>
          <div class="playlist-item-artist">{track.artist}</div>
        </div>
        <div class="playlist-item-duration">{track.duration}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .playlist {
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 20px;
    margin-top: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 30;
  }

  .playlist-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .playlist-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .playlist-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s;
    cursor: pointer;
  }

  .playlist-item.active {
    background: rgba(255, 51, 133, 0.3);
    border-color: #ff3385;
  }

  .playlist-item:active {
    background: rgba(255, 51, 133, 0.4);
  }

  .playlist-item-img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background: linear-gradient(135deg, #ff7eb9, #ff3385);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    color: white;
    font-size: 1.2rem;
  }

  .playlist-item-info {
    flex: 1;
  }

  .playlist-item-title {
    font-weight: 600;
    color: white;
    margin-bottom: 4px;
    font-size: 1rem;
  }

  .playlist-item-artist {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .playlist-item-duration {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
    margin-left: 10px;
  }
</style>