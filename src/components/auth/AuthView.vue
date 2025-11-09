<template>
  <div class="min-h-screen flex flex-col bg-dark-bg">
    <!-- Header with Back Button -->
    <header class="border-b border-dark-card bg-dark-bg/95 backdrop-blur-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          class="flex items-center gap-2 text-off-white hover:text-accent-red transition-colors"
          @click="handleBack"
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
      <div class="w-full max-w-md">
        <!-- Logo/Title Section -->
        <div class="text-center mb-8">
          <h2 class="text-4xl font-black italic text-off-white mb-2">
            {{ activeView === 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ' }}
          </h2>
          <p class="text-off-white/60 uppercase tracking-wider text-sm">
            Theo dõi đơn hàng của bạn
          </p>
        </div>

        <!-- Auth Forms -->
        <div class="transition-all duration-300">
          <LoginForm
            v-if="activeView === 'login'"
            @switch-to-register="activeView = 'register'"
            @login-success="handleAuthSuccess"
          />

          <RegisterForm
            v-else
            @switch-to-login="activeView = 'login'"
            @register-success="handleAuthSuccess"
          />
        </div>

        <!-- Footer -->
        <div class="text-center mt-6 text-sm text-off-white/40">
          © 2025 izTrack - Vietnam Shipping Tracker
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const emits = defineEmits<{
  'auth-success': [];
  'back-to-home': [];
}>();

type AuthView = 'login' | 'register';

const activeView = ref<AuthView>('login');

const handleAuthSuccess = () => {
  emits('auth-success');
};

const handleBack = () => {
  emits('back-to-home');
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
