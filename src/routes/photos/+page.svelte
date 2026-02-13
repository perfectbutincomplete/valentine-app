<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import PhotoCard from '$lib/components/PhotoCard.svelte';
  import ImageModal from '$lib/components/ImageModal.svelte';
  import { base } from '$app/paths';
  
  // КОЛЛЕКЦИЯ ФОТОГРАФИЙ
  // Фото хранятся в /static/photos/
  const photoCollection = [
    {
      id: 1,
      // Локальные файлы из /static/photos/
      url: `${base}/photos/photo-1.jpg`,
      thumbnail: `${base}/photos/photo-1.jpg`,
      location: "Бишкек",
      caption: "Ночная прогулка",
      likes: 67
    },
    {
      id: 2,
      url: `${base}/photos/photo-2.jpg`,
      thumbnail: `${base}/photos/photo-2.jpg`,
      location: "Бишкек",
      caption: "Кинотеатр",
      likes: 67
    },
    {
      id: 3,
      url: `${base}/photos/photo-3.jpg`,
      thumbnail: `${base}/photos/photo-3.jpg`,
      location: "Бишкек",
      caption: "Зимняя прогулка",
      likes: 67
    },
    {
      id: 4,
      url: `${base}/photos/photo-4.jpg`,
      thumbnail: `${base}/photos/photo-4.jpg`,
      location: "Бишкек",
      caption: "Двойное свидание",
      likes: 67
    }
  ];
  
  // Главное фото
  const featurePhoto = {
    url: `${base}/photos/feature.jpg`,
    caption: "Галерея ❤️",
    date: "21 ноября 2024"
  };
  
  // Состояние лайков
  let likesState = $state({});
  
  // Модальное окно
  let modalOpen = $state(false);
  let modalImageUrl = $state('');
  let modalCaption = $state('');
  
  // Плавающие рамки
  let floatingFrames = $state([]);
  
  // Инициализация лайков
  onMount(() => {
    photoCollection.forEach(photo => {
      likesState[photo.id] = {
        count: photo.likes,
        liked: false
      };
    });
    
    // Создаем плавающие рамки
    floatingFrames = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: Math.random() * 40 + 40,
      height: Math.random() * 20 + 50,
      rotation: Math.random() * 40 - 20,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1
    }));
  });
  
  // Обработка лайка
  function handleLike(photoId) {
    const state = likesState[photoId];
    likesState[photoId] = {
      liked: !state.liked,
      count: state.count + (state.liked ? -1 : 1)
    };
  }
  
  // Открытие модального окна
  function openModal(photo) {
    modalImageUrl = photo.url;
    modalCaption = `${photo.caption}, ${photo.location}`;
    modalOpen = true;
  }
  
  // Открытие главного фото
  function openFeaturePhoto() {
    modalImageUrl = featurePhoto.url;
    modalCaption = `${featurePhoto.caption}, ${featurePhoto.date}`;
    modalOpen = true;
  }
  
  // Закрытие модального окна
  function closeModal() {
    modalOpen = false;
  }
</script>

<div class="photos-page" in:fade>
  <!-- Градиентный фон -->
  <div class="gradient-bg"></div>
  
  <!-- Плавающие рамки -->
  <div class="floating-frames">
    {#each floatingFrames as frame (frame.id)}
      <div 
        class="float-frame"
        style="left: {frame.left}%; width: {frame.width}px; height: {frame.height}px; --rot: {frame.rotation}deg; animation-duration: {frame.duration}s; animation-delay: {frame.delay}s; opacity: {frame.opacity};"
      ></div>
    {/each}
  </div>
  
  <div class="photos-container">
    <!-- Заголовок -->
    <div class="photos-header">
      <h1 class="photos-title">Наши фото</h1>
      <p class="photos-subtitle">
        <i class="fas fa-camera"></i>
        MOMENTS
        <i class="fas fa-heart"></i>
      </p>
    </div>
    
    <!-- Главное фото Polaroid -->
    <div class="polaroid-feature" onclick={openFeaturePhoto}>
      <div class="feature-image-container">
        <img 
          class="feature-image" 
          src={featurePhoto.url}
          alt={featurePhoto.caption}
          loading="lazy"
        />
        <div class="image-overlay">
          <div class="image-caption">{featurePhoto.caption}</div>
          <div class="image-date">
            <i class="fas fa-calendar-alt"></i>
            {featurePhoto.date}
          </div>
        </div>
      </div>
      <div class="polaroid-footer">
        <span class="polaroid-title">LOVE STORY</span>
        <span class="polaroid-heart">❤️</span>
      </div>
    </div>
    
    <!-- Галерея фото -->
    <div class="gallery-grid">
      {#each photoCollection as photo (photo.id)}
        <PhotoCard 
          {photo}
          isLiked={likesState[photo.id]?.liked || false}
          likesCount={likesState[photo.id]?.count || photo.likes}
          onLike={() => handleLike(photo.id)}
          onImageClick={openModal}
        />
      {/each}
    </div>
  </div>
  
  <!-- Модальное окно -->
  <ImageModal 
    isOpen={modalOpen}
    imageUrl={modalImageUrl}
    caption={modalCaption}
    onClose={closeModal}
  />
</div>

<style>
  .photos-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px 16px 30px;
    position: relative;
    overflow-x: hidden;
  }

  .gradient-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, #ff7eb9 0%, #ff5d9e 40%, #b3245c 100%);
    opacity: 0.92;
    z-index: 0;
  }

  .gradient-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 70%, rgba(255, 215, 215, 0.2) 0%, transparent 60%);
    animation: softPulse 10s ease-in-out infinite;
  }

  @keyframes softPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }

  .floating-frames {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
  }

  .float-frame {
    position: absolute;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transform: rotate(var(--rot, 0deg));
    animation: floatFrame 25s linear infinite;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  @keyframes floatFrame {
    0% { 
      transform: translateY(100vh) rotate(0deg) scale(0.5);
      opacity: 0;
    }
    10% { opacity: 0.5; }
    90% { opacity: 0.5; }
    100% { 
      transform: translateY(-100px) rotate(360deg) scale(1);
      opacity: 0;
    }
  }

  .photos-container {
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .photos-header {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
  }

  .photos-title {
    font-size: 2.4rem;
    font-weight: 800;
    margin-bottom: 8px;
    background: linear-gradient(to right, #fff, #ffe6f0);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 2px 15px rgba(255, 51, 133, 0.5);
    letter-spacing: 3px;
  }

  .photos-subtitle {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
    letter-spacing: 6px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .photos-subtitle i {
    color: #ffb3d9;
    font-size: 0.9rem;
    animation: sparkle 2s ease-in-out infinite;
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0.5; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  .polaroid-feature {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 16px 16px 24px;
    box-shadow: 
      0 25px 40px rgba(0, 0, 0, 0.3),
      0 0 0 2px rgba(255, 255, 255, 0.1);
    transform: rotate(1deg);
    transition: transform 0.3s ease;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .polaroid-feature:hover {
    transform: rotate(0deg) scale(1.02);
  }

  .feature-image-container {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    margin-bottom: 16px;
  }

  .feature-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .polaroid-feature:hover .feature-image {
    transform: scale(1.05);
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    padding: 20px 16px;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .polaroid-feature:hover .image-overlay {
    opacity: 1;
  }

  .image-caption {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .image-date {
    font-size: 0.85rem;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .polaroid-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
  }

  .polaroid-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #ff3385;
    letter-spacing: 2px;
  }

  .polaroid-heart {
    color: #ff3385;
    font-size: 1.8rem;
    animation: heartbeat 1.8s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.1); }
    30% { transform: scale(1); }
    45% { transform: scale(1.1); }
    60% { transform: scale(1); }
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    .photos-title {
      font-size: 2rem;
    }
  }

  @media (max-width: 380px) {
    .gallery-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  @supports (-webkit-touch-callout: none) {
    .photos-page {
      padding-top: env(safe-area-inset-top, 20px);
      padding-bottom: env(safe-area-inset-bottom, 30px);
    }
  }
</style>