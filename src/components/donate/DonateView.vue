<template>
  <div class="min-h-screen flex flex-col bg-dark-bg">
    <!-- Header with Back Button -->
    <header class="border-b border-dark-card bg-dark-bg/95 backdrop-blur-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          class="flex items-center gap-2 text-off-white hover:text-accent-red transition-colors"
          @click="$emit('back-to-home')"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          <span class="font-bold uppercase text-sm">Quay về trang chủ</span>
        </button>

        <h1 class="text-2xl font-black italic text-off-white">izTrack</h1>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-4xl">
        <!-- Title Section -->
        <div class="text-center mb-12">
          <h2 class="text-5xl font-black italic text-off-white mb-4">ỦNG HỘ</h2>
          <p class="text-off-white/60 text-lg mb-2">Cảm ơn bạn đã muốn ủng hộ dự án izTrack!</p>
          <p class="text-off-white/40 text-sm">
            Mọi đóng góp của bạn sẽ giúp chúng tôi duy trì và phát triển dịch vụ tốt hơn
          </p>
        </div>

        <!-- Payment Methods Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            class="payment-method-card"
            :class="{ active: selectedMethod === method.id }"
            @click="selectedMethod = method.id"
          >
            <div class="payment-logo" :style="{ backgroundColor: method.color }">
              <span class="text-white font-black text-xl">{{ method.label }}</span>
            </div>
            <span class="payment-name">{{ method.name }}</span>
          </button>
        </div>

        <!-- QR Code Display -->
        <transition name="fade">
          <div v-if="selectedMethod" class="qr-display">
            <div class="bg-white p-8 rounded-lg shadow-2xl max-w-md mx-auto">
              <div class="text-center mb-4">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  {{ getSelectedMethodName() }}
                </h3>
                <p class="text-gray-600 text-sm">Quét mã QR để ủng hộ</p>
              </div>

              <div class="qr-image-container">
                <img
                  :src="`/donate/${selectedMethod}.jpg`"
                  :alt="`QR ${getSelectedMethodName()}`"
                  class="w-full h-auto rounded-lg"
                  @error="handleImageError"
                />
              </div>

              <div class="mt-6 text-center">
                <p class="text-gray-700 font-medium mb-2">Hoặc chuyển khoản trực tiếp:</p>
                <div class="bg-gray-50 p-4 rounded-md text-left space-y-2">
                  <p class="text-sm">
                    <span class="font-semibold text-gray-700">Ngân hàng:</span>
                    <span class="text-gray-900 ml-2">{{ getSelectedMethodName() }}</span>
                  </p>
                  <p class="text-sm text-gray-600">
                    Vui lòng quét mã QR để xem thông tin tài khoản
                  </p>
                </div>
              </div>

              <div class="mt-6 text-center">
                <p class="text-xs text-gray-500">❤️ Xin chân thành cảm ơn sự ủng hộ của bạn!</p>
              </div>
            </div>
          </div>
        </transition>

        <!-- Instructions -->
        <div v-if="!selectedMethod" class="text-center mt-12">
          <div class="inline-block bg-dark-card p-8 rounded-lg border border-off-white/10">
            <svg
              class="w-16 h-16 mx-auto mb-4 text-off-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p class="text-off-white/60 text-lg font-medium">
              Chọn phương thức thanh toán để xem mã QR
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-dark-card py-6 text-center">
      <p class="text-sm text-off-white/40">© 2025 izTrack - Vietnam Shipping Tracker</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{
  'back-to-home': [];
}>();

interface PaymentMethod {
  id: string;
  name: string;
  label: string;
  color: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'mbbank', name: 'MB Bank', label: 'MB', color: '#0B4A9D' },
  { id: 'momo', name: 'MoMo', label: 'MoMo', color: '#A50064' },
  { id: 'sppay', name: 'ShopeePay', label: 'SP', color: '#EE4D2D' },
  { id: 'techcombank', name: 'Techcombank', label: 'TCB', color: '#00AB4E' },
  { id: 'vcb', name: 'Vietcombank', label: 'VCB', color: '#007BC3' },
  { id: 'zalopay', name: 'ZaloPay', label: 'ZP', color: '#0068FF' },
];

const selectedMethod = ref<string | null>(null);

const getSelectedMethodName = () => {
  const method = paymentMethods.find((m) => m.id === selectedMethod.value);
  return method ? method.name : '';
};

const handleImageError = (event: globalThis.Event) => {
  const img = event.target as globalThis.HTMLImageElement;
  img.src =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3EKhông tìm thấy ảnh QR%3C/text%3E%3C/svg%3E';
};
</script>

<style scoped>
.payment-method-card {
  background-color: var(--color-dark-card);
  border: 2px solid rgba(240, 237, 229, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.payment-method-card:hover {
  border-color: rgba(231, 76, 60, 0.5);
  transform: scale(1.05);
}

.payment-method-card.active {
  border-color: var(--color-accent-red);
  background-color: rgba(58, 61, 68, 0.8);
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.3);
}

.payment-logo {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.payment-name {
  color: var(--color-off-white);
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.qr-display {
  animation: fade-in 0.5s ease-out;
}

.qr-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  aspect-ratio: 1;
}

.qr-image-container img {
  object-fit: cover;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
