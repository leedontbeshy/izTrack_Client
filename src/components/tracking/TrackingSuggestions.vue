<script setup lang="ts">
type CarrierCallback = (_carrier: string) => void;

interface Props {
  suggestedCarriers: string[];
  requiresPhone: boolean;
  externalUrl: string | null;
  onRetryWithCarrier: CarrierCallback;
  onOpenExternal: () => void;
}

defineProps<Props>();

const carrierLabels: Record<string, string> = {
  GHN: '🚚 GHN - Giao Hàng Nhanh',
  SPX: '📦 SPX - Shopee Express',
  LEX: '✈️ LEX - LEX Vietnam',
  JT_EXPRESS: '🎯 J&T Express',
  GHTK: '💼 GHTK - Giao Hàng Tiết Kiệm',
  BEST_EXPRESS: '⚡ Best Express',
};

const getCarrierLabel = (carrier: string) => {
  return carrierLabels[carrier] || carrier;
};
</script>

<template>
  <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 space-y-4">
    <!-- Title -->
    <div class="flex items-start gap-3">
      <span class="text-2xl">💡</span>
      <div>
        <h3 class="text-lg font-bold text-yellow-400">Không tìm thấy thông tin tracking</h3>
        <p class="text-sm text-off-white/70 mt-1">
          Hệ thống không thể tự động xác định đơn vị vận chuyển
        </p>
      </div>
    </div>

    <!-- Phone requirement warning -->
    <div v-if="requiresPhone" class="bg-yellow-500/20 border border-yellow-500/40 rounded-md p-4">
      <div class="flex items-center gap-2 text-yellow-300">
        <span class="text-xl">⚠️</span>
        <span class="font-semibold">Cần nhập số điện thoại</span>
      </div>
      <p class="text-sm text-off-white/80 mt-2">
        Một số đơn vị vận chuyển yêu cầu số điện thoại để tra cứu. Vui lòng nhập 4 số cuối SĐT người
        nhận.
      </p>
    </div>

    <!-- External URL option -->
    <div v-if="externalUrl" class="bg-blue-500/10 border border-blue-500/30 rounded-md p-4">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">ℹ️</span>
        <p class="text-sm font-semibold text-blue-300">Đơn vị vận chuyển chưa được hỗ trợ</p>
      </div>
      <p class="text-sm text-off-white/80 mb-3">
        Tính năng tra cứu đơn vị này sẽ được cập nhật trong thời gian tới. Bạn sẽ được chuyển đến
        trang tra cứu chính thức trong giây lát...
      </p>
      <button
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        @click="onOpenExternal"
      >
        <span>🔗</span>
        <span>Mở trang tra cứu ngay</span>
        <span>↗️</span>
      </button>
    </div>

    <!-- Suggested carriers -->
    <div v-if="suggestedCarriers.length > 0">
      <p class="text-sm font-semibold text-off-white/90 mb-3">
        Vui lòng chọn đơn vị vận chuyển thủ công:
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="carrier in suggestedCarriers"
          :key="carrier"
          class="bg-off-white/10 hover:bg-off-white/20 border border-off-white/20 hover:border-accent-red/50 rounded-lg p-4 transition-all text-left group"
          @click="onRetryWithCarrier(carrier)"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-base font-medium text-off-white group-hover:text-accent-red transition-colors"
            >
              {{ getCarrierLabel(carrier) }}
            </span>
            <span class="text-off-white/50 group-hover:text-accent-red transition-colors">→</span>
          </div>
        </button>
      </div>
    </div>

    <!-- General guidance -->
    <div class="text-xs text-off-white/50 pt-2 border-t border-off-white/10">
      <p>
        💡 Mẹo: Kiểm tra lại mã vận đơn hoặc chọn đúng đơn vị vận chuyển phía trên để tra cứu chính
        xác hơn.
      </p>
    </div>
  </div>
</template>
