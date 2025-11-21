<script setup lang="ts">
import type { TrackingEvent } from '@/types/tracking';
import { formatDateTime } from '@/utils/helpers';

interface Props {
  events: TrackingEvent[];
}

defineProps<Props>();
</script>

<template>
  <div class="card-flat p-6 md:p-8">
    <h4 class="text-2xl font-bold mb-6 flex items-center gap-2" style="color: var(--color-text-primary)">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      Tracking History
    </h4>

    <div class="space-y-6">
      <div v-for="(event, index) in events" :key="index" class="flex gap-4 relative">
        <!-- Timeline Dot & Line -->
        <div class="flex flex-col items-center">
          <div class="w-4 h-4 rounded-full z-10" style="background-color: var(--color-accent)"></div>
          <div v-if="index < events.length - 1" class="w-0.5 h-full mt-2" style="background-color: var(--color-border)"></div>
        </div>

        <!-- Event Content -->
        <div class="flex-1 pb-6">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-4 h-4" style="color: var(--color-text-muted)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p class="text-sm font-medium" style="color: var(--color-text-muted)">
              {{ formatDateTime(event.timestamp) }}
            </p>
          </div>
          <p class="text-base font-bold mb-2" style="color: var(--color-text-primary)">
            {{ event.status }}
          </p>

          <!-- Location -->
          <div v-if="event.location?.full_address" class="flex items-start gap-2 mt-2">
            <svg class="w-4 h-4 mt-0.5 flex-shrink-0" style="color: var(--color-accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p class="text-sm" style="color: var(--color-text-secondary)">
              {{ event.location.full_address }}
            </p>
          </div>

          <!-- Description -->
          <p v-if="event.description" class="text-sm mt-2" style="color: var(--color-text-secondary)">
            {{ event.description }}
          </p>

          <!-- Executor -->
          <div v-if="event.executor?.name" class="flex items-center gap-2 mt-2">
            <svg class="w-4 h-4" style="color: var(--color-text-muted)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <p class="text-xs" style="color: var(--color-text-muted)">
              {{ event.executor.name }}
              <span v-if="event.executor.phone"> - {{ event.executor.phone }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
