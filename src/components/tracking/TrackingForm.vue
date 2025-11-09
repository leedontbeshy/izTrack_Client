<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/ui/input.vue';
import Button from '@/components/ui/button.vue';

// Nhận props từ App.vue thay vì tự gọi useTracking
interface Props {
  isLoading: boolean;
  trackPackage: Function;
}

const props = defineProps<Props>();

const trackingCode = ref('');
const cellphone = ref('');
const selectedCarrier = ref<string>('AUTO');

// Danh sách carriers
const carriers = [
  { value: 'AUTO', label: '🤖 Tự động nhận diện', color: 'text-blue-400' },
  { value: 'GHN', label: '🚚 GHN - Giao Hàng Nhanh', color: 'text-orange-400' },
  { value: 'SPX', label: '📦 SPX - Shopee Express', color: 'text-red-400' },
  { value: 'LEX', label: '✈️ LEX - LEX Vietnam', color: 'text-green-400' },
  { value: 'JT_EXPRESS', label: '🎯 J&T Express', color: 'text-yellow-400' },
  { value: 'GHTK', label: '💼 GHTK - Giao Hàng Tiết Kiệm', color: 'text-purple-400' },
  { value: 'BEST_EXPRESS', label: '⚡ Best Express', color: 'text-pink-400' },
];

const handleTrack = async () => {
  if (!trackingCode.value.trim()) return;

  // Gọi function được pass từ App.vue với carrier selection
  await props.trackPackage(
    trackingCode.value.toUpperCase(),
    cellphone.value.trim() || undefined,
    selectedCarrier.value !== 'AUTO' ? selectedCarrier.value : undefined,
  );
};

const handleInput = (e: any) => {
  trackingCode.value = (e.target?.value || '').toUpperCase();
};

const handleKeyPress = (e: any) => {
  if (e.key === 'Enter' && trackingCode.value.trim() && !props.isLoading) {
    handleTrack();
  }
};

// Show phone input if J&T is selected
const needsPhone = () => selectedCarrier.value === 'JT_EXPRESS';
</script>

<template>
  <div class="flex flex-col items-center gap-8 max-w-3xl mx-auto px-4">
    <!-- Hero Text -->
    <div class="text-center space-y-2">
      <h2 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-off-white">
        TRACK YOUR
      </h2>
      <h2 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-accent-red">ORDER</h2>
    </div>

    <!-- Input Form -->
    <div class="w-full flex flex-col gap-4">
      <!-- Carrier Selection -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-off-white/80 uppercase tracking-wide">
          Đơn vị vận chuyển
        </label>
        <select
          v-model="selectedCarrier"
          class="bg-off-white/10 text-off-white border border-off-white/20 rounded-lg px-4 py-3 text-base font-medium focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all backdrop-blur-sm"
          :disabled="isLoading"
        >
          <option
            v-for="carrier in carriers"
            :key="carrier.value"
            :value="carrier.value"
            class="bg-dark-bg text-off-white"
          >
            {{ carrier.label }}
          </option>
        </select>
        <p class="text-xs text-off-white/50">
          Chọn "Tự động nhận diện" để hệ thống tự động phát hiện đơn vị vận chuyển
        </p>
      </div>

      <!-- Tracking Code Input -->
      <div class="flex flex-col md:flex-row gap-4">
        <Input
          v-model="trackingCode"
          placeholder="NHẬP MÃ VẬN ĐƠN"
          class="flex-1 bg-off-white text-dark-bg text-center uppercase text-xl md:text-2xl font-bold py-6 md:py-8 focus:ring-accent-red focus:ring-2 transition-shadow"
          :disabled="isLoading"
          @input="handleInput"
          @keypress="handleKeyPress"
        />
        <Button
          :disabled="!trackingCode.trim() || isLoading"
          class="bg-accent-red hover:bg-accent-red-dark disabled:bg-gray-500 disabled:cursor-not-allowed text-off-white font-black uppercase text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 transition-colors"
          @click="handleTrack"
        >
          {{ isLoading ? 'ĐANG TRA...' : 'TRACK' }}
        </Button>
      </div>

      <!-- Phone Input (Always visible if J&T selected, or expandable for others) -->
      <div v-if="needsPhone()" class="flex flex-col gap-2">
        <label
          class="text-sm font-semibold text-yellow-400 uppercase tracking-wide flex items-center gap-2"
        >
          <span>⚠️</span>
          <span>Số điện thoại (Bắt buộc cho J&T Express)</span>
        </label>
        <Input
          v-model="cellphone"
          placeholder="4 số cuối SĐT người nhận"
          maxlength="4"
          class="bg-off-white/10 text-off-white text-center text-base py-4 px-4 border border-yellow-400/50 focus:ring-yellow-400 focus:ring-2"
          :disabled="isLoading"
        />
      </div>

      <!-- Optional Cellphone Input for other carriers -->
      <div v-else class="text-center">
        <details class="inline-block text-left">
          <summary
            class="text-sm text-off-white/60 cursor-pointer hover:text-off-white transition-colors"
          >
            Cần nhập số điện thoại? (Click để mở rộng)
          </summary>
          <div class="mt-4">
            <Input
              v-model="cellphone"
              placeholder="4 số cuối SĐT người nhận"
              maxlength="4"
              class="bg-off-white/10 text-off-white text-center text-sm py-3 px-4 border border-off-white/20 focus:ring-accent-red focus:ring-2"
              :disabled="isLoading"
            />
            <p class="text-xs text-off-white/40 mt-2">
              * Một số đơn vị vận chuyển có thể yêu cầu số điện thoại
            </p>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>
