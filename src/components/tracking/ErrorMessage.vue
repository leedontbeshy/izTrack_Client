<script setup lang="ts">
interface Props {
  message: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-red-500/10 border-2 border-red-500 rounded-lg p-6 md:p-8 mt-8 animate-shake">
    <div class="flex items-start gap-4">
      <span class="text-3xl md:text-4xl shrink-0">⚠️</span>
      <div class="flex-1">
        <p class="text-lg md:text-xl font-black text-red-500 uppercase">Lỗi</p>
        <p class="text-base md:text-lg text-off-white mt-2">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
