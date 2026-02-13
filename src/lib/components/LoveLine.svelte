<div class="love-line">
  <div class="line"></div>
  <div class="heart-pulse">💗</div>
  <div class="line"></div>
</div>

<style>
.love-line {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
}

.line {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 126, 185, 0.4) 50%,
    transparent 100%
  );
}


  .heart-pulse {
    font-size: 1.8rem;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.3);
      opacity: 1;
    }
  }
</style>