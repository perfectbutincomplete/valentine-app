<script>
  let { value = 0, label = '' } = $props();
  
  let formattedValue = $derived(value.toString().padStart(2, '0'));
</script>

<div class="counter-item">
  <div class="counter-value">{formattedValue}</div>
  <div class="counter-label">{label}</div>
</div>

<style>
  .counter-item {
    background: linear-gradient(145deg, #ffffff 0%, #fff8fb 100%);
    border-radius: 20px;
    padding: clamp(1.2rem, 3vw, 1.8rem) clamp(1rem, 2.5vw, 1.5rem);
     min-width: 0;
  flex: 1 1 0;
    box-shadow: 
      0 10px 25px rgba(255, 94, 158, 0.15),
      0 4px 10px rgba(255, 94, 158, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 182, 193, 0.3);
    transition: all 0.3s ease;
    position: relative;
  }

  .counter-item::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 22px;
    background: linear-gradient(135deg, 
      rgba(255, 126, 185, 0.3) 0%,
      rgba(255, 154, 205, 0.2) 50%,
      rgba(255, 126, 185, 0.3) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .counter-item:hover::after {
    opacity: 1;
  }

  .counter-value {
    font-size: clamp(2rem, 6vw, 3.2rem);
    font-weight: 800;
    color: #ff5d9e;
    margin-bottom: 0.5rem;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    letter-spacing: -1px;
    text-shadow: 0 2px 4px rgba(255, 93, 158, 0.2);
    transition: all 0.3s ease;
  }

  .counter-item:hover .counter-value {
    transform: scale(1.05);
    color: #ff3385;
  }

  .counter-label {
    color: #ff7eb9;
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    opacity: 0.9;
  }

  /* Адаптивность для мобильных */
  @media (max-width: 768px) {
    .counter-item {
      min-width: 85px;
      padding: 1.2rem 0.8rem;
      border-radius: 16px;
    }

    .counter-item:nth-child(2n) {
      animation: softGlow 2s ease-in-out infinite;
      animation-delay: 1s;
    }
  }

  @media (max-width: 480px) {
    .counter-item {
      min-width: 75px;
      padding: 1rem 0.6rem;
    }

    .counter-value {
      font-size: 1.8rem;
    }

    .counter-label {
      font-size: 0.8rem;
    }
  }

  @keyframes softGlow {
    0%, 100% {
      box-shadow: 
        0 10px 25px rgba(255, 94, 158, 0.15),
        0 4px 10px rgba(255, 94, 158, 0.08);
    }
    50% {
      box-shadow: 
        0 10px 30px rgba(255, 94, 158, 0.25),
        0 6px 15px rgba(255, 94, 158, 0.15);
    }
  }
</style>