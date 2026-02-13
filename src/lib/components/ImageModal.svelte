<script>
  import { fade, scale } from 'svelte/transition';
  
  let { isOpen = false, imageUrl = '', caption = '', onClose } = $props();
  
  function handleClose() {
    onClose?.();
  }
  
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }
  
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }
</script>

{#if isOpen}
  <div 
    class="modal" 
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <button class="modal-close" onclick={handleClose}>
      <i class="fas fa-times"></i>
    </button>
    <div class="modal-content" transition:scale={{ duration: 300 }}>
      <img class="modal-image" src={imageUrl} alt={caption} />
      <div class="modal-caption">{caption}</div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .modal-content {
    max-width: 90%;
    max-height: 80vh;
    position: relative;
  }

  .modal-image {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 16px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    border: 4px solid white;
  }

  .modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
    z-index: 1001;
  }

  .modal-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  .modal-caption {
    position: absolute;
    bottom: -80px;
    left: 0;
    right: 0;
    color: white;
    text-align: center;
    font-size: 1.1rem;
    padding: 16px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    .modal-close {
      top: 10px;
      right: 10px;
      width: 44px;
      height: 44px;
      font-size: 1.2rem;
    }

    .modal-caption {
      font-size: 0.95rem;
      padding: 12px;
    }
  }
</style>