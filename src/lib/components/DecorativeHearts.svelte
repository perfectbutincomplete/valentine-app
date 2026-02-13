<div class="decorative-hearts">
  <div class="heart">❤️</div>
  <div class="heart">💕</div>
  <div class="heart">💖</div>
  <div class="heart">💝</div>
</div>

<style>
  .decorative-hearts {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .decorative-hearts .heart {
    position: absolute;
    font-size: 1.8rem;
    opacity: 0.15;
    animation: float 15s ease-in-out infinite;
  }

  .decorative-hearts .heart:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .decorative-hearts .heart:nth-child(2) {
    top: 20%;
    right: 15%;
    animation-delay: 3s;
  }

  .decorative-hearts .heart:nth-child(3) {
    bottom: 30%;
    left: 15%;
    animation-delay: 6s;
  }

  .decorative-hearts .heart:nth-child(4) {
    bottom: 15%;
    right: 10%;
    animation-delay: 9s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-15px) rotate(5deg);
    }
    50% {
      transform: translateY(-30px) rotate(0deg);
    }
    75% {
      transform: translateY(-15px) rotate(-5deg);
    }
  }
</style>