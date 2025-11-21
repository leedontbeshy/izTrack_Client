<script setup lang="ts">
import Card from '@/components/ui/card.vue';
import CardHeader from '@/components/ui/card-header.vue';
import CardTitle from '@/components/ui/card-title.vue';
import CardContent from '@/components/ui/card-content.vue';
import type { PersonInfo } from '@/types/tracking';

interface Props {
  sender?: PersonInfo;
  receiver?: PersonInfo;
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Sender Info -->
    <Card v-if="sender" class="card-flat">
      <CardHeader>
        <CardTitle class="text-lg font-bold flex items-center gap-2" style="color: var(--color-text-primary)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
          Sender
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div>
          <p class="text-xs font-semibold mb-1" style="color: var(--color-text-muted)">Name</p>
          <p class="text-base" style="color: var(--color-text-primary)">{{ sender.name }}</p>
        </div>
        <div v-if="sender.phone">
          <p class="text-xs font-semibold mb-1" style="color: var(--color-text-muted)">Phone</p>
          <p class="text-base" style="color: var(--color-text-primary)">{{ sender.phone }}</p>
        </div>
        <div v-if="sender.address">
          <p class="text-xs font-semibold mb-1" style="color: var(--color-text-muted)">Address</p>
          <p class="text-base" style="color: var(--color-text-primary)">{{ sender.address }}</p>
        </div>
      </CardContent>
    </Card>

    <!-- Receiver Info -->
    <Card v-if="receiver" class="card-flat">
      <CardHeader>
        <CardTitle class="text-lg font-bold flex items-center gap-2" style="color: var(--color-text-primary)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Receiver
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div>
          <p class="text-xs font-semibold mb-1" style="color: var(--color-text-muted)">Name</p>
          <p class="text-base" style="color: var(--color-text-primary)">{{ receiver.name }}</p>
        </div>
        <div v-if="receiver.phone">
          <p class="text-xs font-semibold mb-1" style="color: var(--color-text-muted)">Phone</p>
          <p class="text-base" style="color: var(--color-text-primary)">{{ receiver.phone }}</p>
        </div>
        <div v-if="receiver.address">
          <p class="text-xs font-semibold mb-1" style="color: var(--color-text-muted)">Address</p>
          <p class="text-base" style="color: var(--color-text-primary)">{{ receiver.address }}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
