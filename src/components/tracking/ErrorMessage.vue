<script setup lang="ts">
interface Props {
  message: string;
}

defineProps<Props>();
</script>

<template>
  <div class="max-w-2xl mx-auto mt-8">
    <div class="error-card">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #fee2e2">
          <svg class="w-6 h-6" style="color: var(--color-error)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold mb-2" style="color: var(--color-error)">
            Unable to Track Package
          </h3>
          <p class="text-base" style="color: var(--color-text-secondary)">
            {{ message }}
          </p>
          <p class="text-sm mt-3" style="color: var(--color-text-muted)">
            Please check your tracking number and try again.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-card {
  background-color: var(--color-secondary-bg);
  border: 2px solid var(--color-error);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}
</style>
