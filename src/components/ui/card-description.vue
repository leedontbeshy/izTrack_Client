<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const descriptionClass = computed(() => cn('text-sm text-[#f0ede5]/60', props.class));
</script>

<template>
  <p :class="descriptionClass">
    <slot />
  </p>
</template>
