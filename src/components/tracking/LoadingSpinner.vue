<script setup lang="ts">
// LoadingSpinner - Animated loading indicator
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 md:py-16">
    <!-- Spinner -->
    <div class="relative w-16 h-16 md:w-20 md:h-20">
      <div class="absolute inset-0 border-4 border-off-white/20 rounded-full"></div>
      <div
        class="absolute inset-0 border-4 border-accent-red rounded-full border-t-transparent animate-spin"
      ></div>
    </div>

    <!-- Loading Text -->
    <p class="mt-6 text-lg md:text-xl font-bold uppercase text-off-white animate-pulse">
      Đang tra cứu...
    </p>

    <p class="mt-2 text-sm text-off-white/60">Vui lòng đợi trong giây lát</p>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
