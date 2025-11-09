<script setup lang="ts">
import type { TrackingEvent } from '@/types/tracking';
import { formatDateTime } from '@/utils/helpers';

interface Props {
  events: TrackingEvent[];
}

defineProps<Props>();
</script>

<template>
  <div class="bg-dark-card rounded-lg p-6 md:p-8">
    <h4 class="text-xl md:text-2xl font-black uppercase text-off-white mb-6">Lịch sử di chuyển</h4>

    <div class="space-y-6">
      <div v-for="(event, index) in events" :key="index" class="flex gap-4 relative">
        <!-- Timeline Dot & Line -->
        <div class="flex flex-col items-center">
          <div class="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-red z-10"></div>
          <div v-if="index < events.length - 1" class="w-0.5 h-full bg-off-white/20 mt-2"></div>
        </div>

        <!-- Event Content -->
        <div class="flex-1 pb-6">
          <p class="text-xs md:text-sm font-bold text-off-white/60">
            {{ formatDateTime(event.timestamp) }}
          </p>
          <p class="text-base md:text-lg font-bold text-off-white mt-1">
            {{ event.status }}
          </p>

          <!-- Location -->
          <p
            v-if="event.location?.full_address"
            class="text-sm md:text-base text-off-white/80 mt-1"
          >
            📍 {{ event.location.full_address }}
          </p>

          <!-- Description -->
          <p v-if="event.description" class="text-sm md:text-base text-off-white/80 mt-1">
            {{ event.description }}
          </p>

          <!-- Executor -->
          <p v-if="event.executor?.name" class="text-xs md:text-sm text-off-white/60 mt-1">
            👤 {{ event.executor.name }}
            <span v-if="event.executor.phone"> - {{ event.executor.phone }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
