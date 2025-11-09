<script setup lang="ts">
import { computed } from 'vue';
import type { UnifiedTrackingData } from '@/types/tracking';
import TrackingStatus from './TrackingStatus.vue';
import ShippingInfo from './ShippingInfo.vue';
import TrackingTimeline from './TrackingTimeline.vue';
import { getCarrierName } from '@/utils/helpers';

interface Props {
  data: UnifiedTrackingData;
}

const props = defineProps<Props>();

const carrierDisplay = computed(() => getCarrierName(props.data.carrier));

const hasShippingInfo = computed(() => props.data.sender || props.data.receiver);

const hasTrackingHistory = computed(
  () => props.data.tracking_history && props.data.tracking_history.length > 0,
);
</script>

<template>
  <div class="w-full max-w-5xl mx-auto mt-8 md:mt-12 space-y-6 px-4">
    <!-- Carrier Header -->
    <div class="text-center">
      <p class="text-xs md:text-sm font-bold uppercase tracking-wide text-off-white/60">
        Đơn vị vận chuyển
      </p>
      <h3 class="text-3xl md:text-4xl font-black uppercase text-off-white mt-2">
        {{ carrierDisplay }}
      </h3>
      <p class="text-base md:text-lg text-off-white/80 mt-2 font-mono">
        {{ data.tracking_number }}
      </p>
      <p v-if="data.order_code" class="text-sm text-off-white/60 mt-1">
        Mã đơn hàng: {{ data.order_code }}
      </p>
    </div>

    <!-- Status Section -->
    <TrackingStatus :data="data" />

    <!-- Shipping Info -->
    <ShippingInfo v-if="hasShippingInfo" :sender="data.sender" :receiver="data.receiver" />

    <!-- Timeline -->
    <TrackingTimeline v-if="hasTrackingHistory" :events="data.tracking_history" />

    <!-- No History Message -->
    <div v-else class="bg-dark-card rounded-lg p-6 md:p-8 text-center">
      <p class="text-base md:text-lg text-off-white/60">Chưa có lịch sử di chuyển</p>
    </div>
  </div>
</template>
