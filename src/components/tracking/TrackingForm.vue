<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/ui/input.vue';
import Button from '@/components/ui/button.vue';

interface Props {
  isLoading: boolean;
  trackPackage: Function;
}

const props = defineProps<Props>();

const trackingCode = ref('');
const cellphone = ref('');
const selectedCarrier = ref<string>('AUTO');

const carriers = [
  { value: 'AUTO', label: 'Auto-detect carrier', icon: '🤖' },
  { value: 'GHN', label: 'GHN - Giao Hang Nhanh', icon: '🚚' },
  { value: 'SPX', label: 'SPX - Shopee Express', icon: '📦' },
  { value: 'LEX', label: 'LEX - LEX Vietnam', icon: '✈️' },
  { value: 'JT_EXPRESS', label: 'J&T Express', icon: '🎯' },
  { value: 'GHTK', label: 'GHTK - Giao Hang Tiet Kiem', icon: '💼' },
  { value: 'BEST_EXPRESS', label: 'Best Express', icon: '⚡' },
];

const handleTrack = async () => {
  if (!trackingCode.value.trim()) return;

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

const needsPhone = () => selectedCarrier.value === 'JT_EXPRESS';
</script>

<template>
  <div class="hero-section">
    <div class="max-w-4xl mx-auto">
      <!-- Hero Text -->
      <div class="text-center mb-12">
        <div class="inline-block mb-4 px-4 py-2 rounded-full text-sm font-semibold" style="background-color: var(--color-accent); color: white; box-shadow: var(--shadow-md)">
          Vietnam Shipping Tracker
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-4" style="color: var(--color-text-primary); line-height: 1.1">
          Track Your Package
          <span class="block mt-2" style="color: var(--color-accent)">In Real-Time</span>
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto" style="color: var(--color-text-secondary)">
          Enter your tracking code below to get instant updates on your shipment
        </p>
      </div>

      <!-- Main Tracking Card -->
      <div class="card-elevated p-6 md:p-8 mb-6">
        <div class="space-y-6">
          <!-- Carrier Selection -->
          <div>
            <label class="block text-sm font-semibold mb-3" style="color: var(--color-text-primary)">
              Select Carrier
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="carrier in carriers"
                :key="carrier.value"
                :class="['carrier-option', { 'carrier-option-active': selectedCarrier === carrier.value }]"
                :disabled="isLoading"
                @click="selectedCarrier = carrier.value"
              >
                <span class="text-2xl mb-1">{{ carrier.icon }}</span>
                <span class="text-xs font-medium">{{ carrier.label.split(' - ')[0] }}</span>
              </button>
            </div>
          </div>

          <!-- Tracking Code Input -->
          <div>
            <label class="block text-sm font-semibold mb-3" style="color: var(--color-text-primary)">
              Tracking Number
            </label>
            <div class="flex flex-col md:flex-row gap-3">
              <Input
                v-model="trackingCode"
                placeholder="Enter your tracking code"
                class="flex-1 input-modern text-lg font-semibold tracking-wide uppercase"
                :disabled="isLoading"
                @input="handleInput"
                @keypress="handleKeyPress"
              />
              <Button
                :disabled="!trackingCode.trim() || isLoading"
                class="btn-primary px-8 py-3 text-base font-semibold whitespace-nowrap"
                @click="handleTrack"
              >
                {{ isLoading ? 'Tracking...' : 'Track Package' }}
              </Button>
            </div>
          </div>

          <!-- Phone Input (Conditional) -->
          <div v-if="needsPhone()" class="warning-box">
            <div class="flex items-start gap-3">
              <span class="text-xl flex-shrink-0">⚠️</span>
              <div class="flex-1">
                <p class="font-semibold mb-2" style="color: var(--color-warning)">
                  Phone Number Required
                </p>
                <Input
                  v-model="cellphone"
                  placeholder="Last 4 digits of receiver's phone"
                  maxlength="4"
                  class="input-modern"
                  :disabled="isLoading"
                />
              </div>
            </div>
          </div>

          <!-- Optional Phone (Expandable) -->
          <details v-else class="text-center">
            <summary class="text-sm font-medium cursor-pointer inline-block" style="color: var(--color-text-secondary)">
              Need to enter phone number?
            </summary>
            <div class="mt-4 max-w-md mx-auto">
              <Input
                v-model="cellphone"
                placeholder="Last 4 digits (optional)"
                maxlength="4"
                class="input-modern text-center"
                :disabled="isLoading"
              />
              <p class="text-xs mt-2" style="color: var(--color-text-muted)">
                Some carriers may require phone verification
              </p>
            </div>
          </details>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="info-card">
          <div class="text-3xl mb-3">🚀</div>
          <h3 class="font-semibold mb-1" style="color: var(--color-text-primary)">Real-Time</h3>
          <p class="text-sm" style="color: var(--color-text-secondary)">Get instant tracking updates</p>
        </div>
        <div class="info-card">
          <div class="text-3xl mb-3">🔒</div>
          <h3 class="font-semibold mb-1" style="color: var(--color-text-primary)">Secure</h3>
          <p class="text-sm" style="color: var(--color-text-secondary)">Your data is protected</p>
        </div>
        <div class="info-card">
          <div class="text-3xl mb-3">📱</div>
          <h3 class="font-semibold mb-1" style="color: var(--color-text-primary)">Multi-Carrier</h3>
          <p class="text-sm" style="color: var(--color-text-secondary)">Support all major carriers</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carrier-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--color-secondary-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 100px;
}

.carrier-option:hover:not(:disabled) {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.carrier-option-active {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
  box-shadow: var(--shadow-md);
}

.carrier-option:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.warning-box {
  background-color: #fef3c7;
  border: 2px solid #fbbf24;
  border-radius: var(--radius-md);
  padding: 1rem;
}

.info-card {
  background-color: var(--color-secondary-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
}

.info-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
</style>
