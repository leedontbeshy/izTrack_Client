<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { type HTMLAttributes, computed } from 'vue';
import { type ButtonVariants, buttonVariants } from './button-variants';
import { cn } from '@/lib/utils';

interface Props {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
});

const buttonClass = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class),
);
</script>

<template>
  <button :class="buttonClass" :disabled="disabled">
    <slot />
  </button>
</template>
