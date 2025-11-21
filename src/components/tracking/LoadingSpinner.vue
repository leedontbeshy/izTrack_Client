<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16">
    <div class="relative w-20 h-20 mb-6">
      <div class="absolute inset-0 rounded-full" style="border: 4px solid var(--color-border)"></div>
      <div
        class="absolute inset-0 rounded-full animate-spin"
        style="border: 4px solid var(--color-accent); border-top-color: transparent"
      ></div>
    </div>

    <h3 class="text-xl font-bold mb-2" style="color: var(--color-text-primary)">
      Tracking Your Package
    </h3>
    <p class="text-sm" style="color: var(--color-text-secondary)">
      Please wait while we fetch the latest information
    </p>
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
</style>
