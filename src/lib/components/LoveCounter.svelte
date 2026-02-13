<script>
  import CounterItem from '$lib/components/CounterItem.svelte';
  
  let { days = 0, hours = 0, minutes = 0, seconds = 0 } = $props();
</script>

<div class="counter">
  <CounterItem value={days} label="дней" />
  <div class="counter-separator">:</div>
  <CounterItem value={hours} label="часов" />
  <div class="counter-separator">:</div>
  <CounterItem value={minutes} label="минут" />
  <div class="counter-separator">:</div>
  <CounterItem value={seconds} label="секунд" />
</div>

<style>
  .counter {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(0.8rem, 2.5vw, 1.5rem);
    flex-wrap: wrap;
    margin-bottom: 3rem;
    position: relative;
    z-index: 1;
  }

  .counter-separator {
    color: #ffb3d9;
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 300;
    margin: 0 0.2rem;
    opacity: 0.7;
    line-height: 1;
  }

  @media (max-width: 768px) {
    .counter {
      gap: 0.8rem;
    }

    .counter-separator {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .counter {
      gap: 0.6rem;
    }
  }
</style>