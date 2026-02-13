<script>
  let { photo, isLiked = false, likesCount, onLike, onImageClick } = $props();
  
  function handleLikeClick(e) {
    e.stopPropagation();
    onLike?.();
  }
  
  function handleImageClick() {
    onImageClick?.(photo);
  }
</script>

<div class="photo-card">
  <div class="photo-image-container" onclick={handleImageClick}>
    <img 
      class="photo-image" 
      src={photo.thumbnail} 
      alt={photo.caption}
      loading="lazy"
    />
  </div>
  <div class="photo-info">
    <div class="photo-location">
      <span>{photo.location}</span>
    </div>
    <div 
      class="photo-like" 
      class:liked={isLiked}
      onclick={handleLikeClick}
    >
      <i class="fa{isLiked ? 's' : 'r'} fa-heart"></i>
      <span class="likes-count">{likesCount}</span>
    </div>
  </div>
</div>

<style>
  .photo-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 12px 12px 16px;
    box-shadow: 
      0 15px 25px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: rotate(var(--rot, 0deg));
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .photo-card:nth-child(odd) {
    --rot: -1deg;
  }

  .photo-card:nth-child(even) {
    --rot: 2deg;
  }

  .photo-card:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 
      0 25px 35px rgba(255, 51, 133, 0.3),
      0 0 0 3px rgba(255, 255, 255, 0.3);
    z-index: 30;
  }

  .photo-image-container {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    margin-bottom: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .photo-card:hover .photo-image {
    transform: scale(1.1);
  }

  .photo-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
  }

  .photo-location {
    display: flex;
    flex-direction: column;
  }

  .photo-location span {
    font-size: 0.9rem;
    font-weight: 600;
    color: #ff3385;
  }

  .photo-location small {
    font-size: 0.7rem;
    color: #666;
    margin-top: 2px;
  }

  .photo-like {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #ff5d9e;
    font-size: 0.9rem;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .photo-like i {
    font-size: 1.2rem;
    transition: all 0.2s ease;
  }

  .photo-like:hover i {
    transform: scale(1.2);
    color: #ff3385;
  }

  .photo-like.liked i {
    color: #ff3385;
    font-weight: 900;
  }
</style>