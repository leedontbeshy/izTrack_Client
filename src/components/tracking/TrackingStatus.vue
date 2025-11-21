<script setup lang="ts">
import { computed } from 'vue';
import Badge from '@/components/ui/badge.vue';
import type { UnifiedTrackingData, EstimatedTime } from '@/types/tracking';
import { getStatusColor, getStatusLabel, formatDateTime } from '@/utils/helpers';

interface Props {
  data: UnifiedTrackingData;
}

const props = defineProps<Props>();

const statusBadgeClass = computed(() => {
  return `${getStatusColor(props.data.current_status)} text-white font-bold text-base md:text-lg px-4 py-2`;
});

const hasEstimatedTime = computed(() => {
  const est = props.data.estimated_time as EstimatedTime | undefined;
  return est && (est.delivery_time_from || est.delivery_time_to);
});

const estimatedDeliveryText = computed(() => {
  const est = props.data.estimated_time as EstimatedTime | undefined;
  if (!est) return null;

  if (est.delivery_time_to) {
    return formatDateTime(est.delivery_time_to);
  }
  if (est.delivery_time_from) {
    return formatDateTime(est.delivery_time_from);
  }
  return null;
});
</script>

<template>
  <div class="card-elevated p-6 md:p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Current Status -->
      <div>
        <p class="text-sm font-semibold mb-3" style="color: var(--color-text-muted)">
          Current Status
        </p>
        <Badge :class="statusBadgeClass" class="text-base font-bold px-4 py-2">
          {{ getStatusLabel(data.current_status) }}
        </Badge>
      </div>

      <!-- Estimated Delivery Time -->
      <div v-if="hasEstimatedTime" class="text-left md:text-right">
        <p class="text-sm font-semibold mb-3" style="color: var(--color-text-muted)">
          Estimated Delivery
        </p>
        <div class="flex items-center gap-2" :class="{ 'md:justify-end': hasEstimatedTime }">
          <svg class="w-5 h-5" style="color: var(--color-accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-bold" style="color: var(--color-text-primary)">
            {{ estimatedDeliveryText }}
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-4 pt-4 border-t" style="border-color: var(--color-border)">
      <!-- Status Text -->
      <div v-if="data.current_status_text">
        <p class="text-sm font-semibold mb-2" style="color: var(--color-text-muted)">
          Original Status
        </p>
        <p class="text-base" style="color: var(--color-text-secondary)">
          {{ data.current_status_text }}
        </p>
      </div>

      <!-- Current Description -->
      <div v-if="data.current_description">
        <p class="text-sm font-semibold mb-2" style="color: var(--color-text-muted)">Description</p>
        <p class="text-base" style="color: var(--color-text-secondary)">
          {{ data.current_description }}
        </p>
      </div>

      <!-- Last Updated -->
      <div>
        <p class="text-sm font-semibold mb-2" style="color: var(--color-text-muted)">
          Last Updated
        </p>
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" style="color: var(--color-text-muted)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-sm" style="color: var(--color-text-secondary)">
            {{ formatDateTime(data.last_updated) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
