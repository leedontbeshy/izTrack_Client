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
  <div class="bg-dark-card rounded-lg p-6 md:p-8 space-y-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <!-- Current Status -->
      <div>
        <p class="text-xs md:text-sm font-bold uppercase tracking-wide text-off-white/60">
          Trạng thái hiện tại
        </p>
        <Badge :class="statusBadgeClass" class="mt-2">
          {{ getStatusLabel(data.current_status) }}
        </Badge>
      </div>

      <!-- Estimated Delivery Time -->
      <div v-if="hasEstimatedTime" class="text-left md:text-right">
        <p class="text-xs md:text-sm font-bold uppercase tracking-wide text-off-white/60">
          Dự kiến giao hàng
        </p>
        <p class="text-lg md:text-xl font-bold text-off-white mt-2">
          {{ estimatedDeliveryText }}
        </p>
      </div>
    </div>

    <!-- Status Text -->
    <div v-if="data.current_status_text">
      <p class="text-xs md:text-sm font-bold uppercase tracking-wide text-off-white/60">
        Trạng thái gốc
      </p>
      <p class="text-base md:text-lg text-off-white mt-2">
        {{ data.current_status_text }}
      </p>
    </div>

    <!-- Current Description -->
    <div v-if="data.current_description">
      <p class="text-xs md:text-sm font-bold uppercase tracking-wide text-off-white/60">Mô tả</p>
      <p class="text-base md:text-lg text-off-white mt-2">
        {{ data.current_description }}
      </p>
    </div>

    <!-- Last Updated -->
    <div>
      <p class="text-xs md:text-sm font-bold uppercase tracking-wide text-off-white/60">
        Cập nhật lần cuối
      </p>
      <p class="text-sm md:text-base text-off-white/80 mt-2">
        {{ formatDateTime(data.last_updated) }}
      </p>
    </div>
  </div>
</template>
