<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { type HTMLAttributes, computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  type?: string;
  modelValue?: string | number;
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  input: [event: any];
}>();

const inputClass = computed(() =>
  cn(
    'flex h-10 w-full rounded-md border-2 border-[#3a3d44] bg-[#f0ede5] px-3 py-2 text-sm text-[#2a2d34] placeholder:text-[#2a2d34]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e74c3c] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
    props.class,
  ),
);

const handleInput = (event: any) => {
  const target = event.target as any;
  emit('update:modelValue', target.value);
  emit('input', event);
};
</script>

<template>
  <input
    :type="type"
    :class="inputClass"
    :value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="handleInput"
  />
</template>
