<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { type HTMLAttributes, computed } from 'vue';
import { type BadgeVariants, badgeVariants } from './badge-variants';
import { cn } from '@/lib/utils';

interface Props {
  variant?: BadgeVariants['variant'];
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const badgeClass = computed(() => cn(badgeVariants({ variant: props.variant }), props.class));
</script>

<template>
  <div :class="badgeClass">
    <slot />
  </div>
</template>
