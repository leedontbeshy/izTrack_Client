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
    'input-modern',
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
