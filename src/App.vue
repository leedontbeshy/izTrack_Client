<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import TrackingForm from './components/tracking/TrackingForm.vue';
import TrackingResult from './components/tracking/TrackingResult.vue';
import TrackingSuggestions from './components/tracking/TrackingSuggestions.vue';
import LoadingSpinner from './components/tracking/LoadingSpinner.vue';
import ErrorMessage from './components/tracking/ErrorMessage.vue';
import AuthView from './components/auth/AuthView.vue';
import DonateView from './components/donate/DonateView.vue';
import { useTracking } from './composables/useTracking';
import { useAuth } from './composables/useAuth';

// Single source of truth cho tracking state
const tracking = useTracking();
const {
  trackingData,
  isLoading,
  error,
  hasData,
  hasError,
  hasSuggestions,
  suggestedCarriers,
  requiresPhone,
  externalUrl,
  trackPackage,
  retryWithCarrier,
  openExternalUrl,
} = tracking;

// Auth state
const { isAuthenticated } = useAuth();
const showAuthView = ref(false);
const showDonateView = ref(false);

const handleAuthClick = () => {
  showAuthView.value = true;
  showDonateView.value = false;
};

const handleAuthSuccess = () => {
  showAuthView.value = false;
};

const handleBackToHome = () => {
  showAuthView.value = false;
  showDonateView.value = false;
};

const handleDonateClick = () => {
  showDonateView.value = true;
  showAuthView.value = false;
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-dark-bg">
    <!-- Auth View (full screen overlay) -->
    <AuthView
      v-if="showAuthView && !isAuthenticated"
      @auth-success="handleAuthSuccess"
      @back-to-home="handleBackToHome"
    />

    <!-- Donate View (full screen overlay) -->
    <DonateView v-else-if="showDonateView" @back-to-home="handleBackToHome" />

    <!-- Main App -->
    <template v-else>
      <!-- Header -->
      <AppHeader :on-auth-click="handleAuthClick" :on-donate-click="handleDonateClick" />

      <!-- Main Content -->
      <main class="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div class="w-full max-w-7xl">
          <!-- Tracking Form - pass trackPackage function và isLoading state -->
          <TrackingForm :is-loading="isLoading" :track-package="trackPackage" />

          <!-- Loading State -->
          <LoadingSpinner v-if="isLoading" />

          <!-- Carrier Suggestions (when auto-detect fails) -->
          <TrackingSuggestions
            v-else-if="hasSuggestions"
            :suggested-carriers="suggestedCarriers"
            :requires-phone="requiresPhone"
            :external-url="externalUrl"
            :on-retry-with-carrier="retryWithCarrier"
            :on-open-external="openExternalUrl"
          />

          <!-- Error State (generic error without suggestions) -->
          <ErrorMessage v-else-if="hasError" :message="error || 'Đã xảy ra lỗi'" />

          <!-- Results -->
          <TrackingResult v-else-if="hasData && trackingData" :data="trackingData" />
        </div>
      </main>

      <!-- Footer (optional) -->
      <footer class="border-t border-dark-card py-6 text-center">
        <p class="text-sm text-off-white/40">© 2025 izTrack - Vietnam Shipping Tracker</p>
      </footer>
    </template>
  </div>
</template>
