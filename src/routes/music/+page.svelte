<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import VinylPlayer from '$lib/components/VinylPlayer.svelte';
  import TrackInfo from '$lib/components/TrackInfo.svelte';
  import Playlist from '$lib/components/Playlist.svelte';
  
  // ПЛЕЙЛИСТ
  // Музыка будет загружаться из /static/music/
  const playlist = [
    {
      title: "Closer",
      artist: "The Chainsmokers ft. Halsey",
      duration: "4:05",
      icon: "music",
      audioUrl: "/music/closer.mp3"
    },
    {
      title: "BIRAQ!",
      artist: "Dosekesh",
      duration: "2:54",
      icon: "heart",
      audioUrl: "/music/uzbek.mp3"
    },
    {
      title: "Nobody's businness",
      artist: "Rihanna ft. Chris Brown",
      duration: "3:16",
      icon: "book",
      audioUrl: "/music/nobody.mp3"
    },
    {
      title: "нужна ",
      artist: "M’Dee",
      duration: "4:20",
      icon: "moon",
      audioUrl: "/music/needy.mp3"
    }
  ];
  
  // Состояние плеера
  let isPlaying = $state(false);
  let currentTrackIndex = $state(0);
  let currentTime = $state(0);
  let duration = $state(0);
  let audio = $state(null);
  
  // Текущий трек
  let currentTrack = $derived(playlist[currentTrackIndex]);
  
  // Инициализация аудио
  function initAudio() {
    if (audio) {
      audio.pause();
      audio = null;
    }
    
    const track = playlist[currentTrackIndex];
    audio = new Audio(track.audioUrl);
    audio.volume = 0.7;
    
    audio.addEventListener('loadedmetadata', () => {
      duration = audio.duration;
    });
    
    audio.addEventListener('timeupdate', () => {
      currentTime = audio.currentTime;
    });
    
    audio.addEventListener('ended', () => {
      nextTrack();
    });
    
    // Обработка ошибок (если файл не найден)
    audio.addEventListener('error', (e) => {
      console.error('Ошибка загрузки аудио:', track.audioUrl);
      alert(`Не удалось загрузить трек: ${track.title}\nПроверьте, что файл находится в /static/music/`);
    });
  }
  
  // Воспроизведение
  function play() {
    if (!audio) {
      initAudio();
    }
    
    audio.play()
      .then(() => {
        isPlaying = true;
      })
      .catch(error => {
        console.error('Ошибка воспроизведения:', error);
      });
  }
  
  // Пауза
  function pause() {
    if (audio) {
      audio.pause();
    }
    isPlaying = false;
  }
  
  // Переключение воспроизведения
  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }
  
  // Следующий трек
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack();
    if (isPlaying) {
      play();
    }
  }
  
  // Предыдущий трек
  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack();
    if (isPlaying) {
      play();
    }
  }
  
  // Загрузка трека
  function loadTrack() {
    currentTime = 0;
    duration = 0;
    initAudio();
  }
  
  // Выбор трека из плейлиста
  function selectTrack(index) {
    currentTrackIndex = index;
    loadTrack();
    if (isPlaying) {
      play();
    }
  }
  
  // Перемотка
  function seek(time) {
    if (audio) {
      audio.currentTime = time;
    }
  }
  
  // Создание плавающих сердечек
  let floatingHearts = $state([]);
  
  onMount(() => {
    initAudio();
    
    // Создаем плавающие сердечки
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🎵', '🎶'];
    floatingHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
      left: Math.random() * 100,
      fontSize: Math.random() * 24 + 16,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10
    }));
  });
  
  onDestroy(() => {
    if (audio) {
      audio.pause();
      audio = null;
    }
  });
</script>

<div class="music-page" in:fade>
  <!-- Градиентный фон -->
  <div class="gradient-bg"></div>
  
  <!-- Плавающие сердечки -->
  <div class="floating-hearts">
    {#each floatingHearts as heart (heart.id)}
      <div 
        class="heart-float"
        style="left: {heart.left}%; font-size: {heart.fontSize}px; animation-duration: {heart.duration}s; animation-delay: {heart.delay}s;"
      >
        {heart.symbol}
      </div>
    {/each}
  </div>
  
  <div class="music-container">
    <!-- Заголовок -->
    <div class="music-header">
      <h1 class="music-title">ПЛЕЙЛИСТ ЛЮБВИ</h1>
    </div>
    
    <!-- Виниловый диск -->
    <VinylPlayer 
      {currentTrack} 
      {isPlaying}
      onPlayPause={togglePlay}
    />
    
    <!-- Информация о треке -->
    <TrackInfo
      track={currentTrack}
      {isPlaying}
      {currentTime}
      {duration}
      onPlayPause={togglePlay}
      onPrev={prevTrack}
      onNext={nextTrack}
      onSeek={seek}
    />
    
    <!-- Плейлист -->
    <Playlist
      tracks={playlist}
      {currentTrackIndex}
      onSelectTrack={selectTrack}
    />
  </div>
</div>

<style>
  .music-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    padding-bottom: 30px;
    position: relative;
    overflow-x: hidden;
  }

  .gradient-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 40%, #ff7eb9 0%, #ff5d9e 30%, #ff3385 70%, #b3245c 100%);
    opacity: 0.9;
    z-index: 0;
  }

  .gradient-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 60%, rgba(255, 182, 193, 0.3) 0%, transparent 60%);
    animation: pulseGlow 8s ease-in-out infinite;
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .floating-hearts {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
  }

  .heart-float {
    position: absolute;
    color: rgba(255, 255, 255, 0.4);
    animation: floatUp 15s linear infinite;
  }

  @keyframes floatUp {
    0% { 
      transform: translateY(100vh) rotate(0deg) scale(0.5);
      opacity: 0;
    }
    10% { opacity: 0.8; }
    90% { opacity: 0.8; }
    100% { 
      transform: translateY(-100px) rotate(360deg) scale(1.2);
      opacity: 0;
    }
  }

  .music-container {
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    position: relative;
    z-index: 10;
  }

  .music-header {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    z-index: 20;
  }

  .music-title {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 8px;
    background: linear-gradient(to right, #fff, #ffe6f0);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 2px 10px rgba(255, 51, 133, 0.5);
    letter-spacing: 2px;
  }

  @media (max-width: 480px) {
    .music-title {
      font-size: 1.8rem;
    }
  }

  @supports (-webkit-touch-callout: none) {
    .music-page {
      padding-top: env(safe-area-inset-top, 16px);
      padding-bottom: env(safe-area-inset-bottom, 30px);
    }
  }
</style>