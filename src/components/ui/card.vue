<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const cardClass = computed(() =>
  cn('rounded-lg border border-[#3a3d44] bg-[#3a3d44] text-[#f0ede5] shadow-sm', props.class),
);
</script>

<template>
  <div :class="cardClass">
    <slot />
  </div>
</template>
