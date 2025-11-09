<script setup lang="ts">
// AppHeader - Main navigation header with logo and links
import { useAuth } from '@/composables/useAuth';
import { Button } from '@/components/ui';

defineProps<{
  onAuthClick?: () => void;
  onDonateClick?: () => void;
}>();

const { isAuthenticated, getUserDisplayName, logout } = useAuth();

const handleLogout = async () => {
  await logout();
};
</script>

<template>
  <header class="border-b border-dark-card bg-dark-bg">
    <div class="container mx-auto px-4 py-6 flex items-center justify-between">
      <!-- Logo -->
      <h1 class="text-3xl font-black italic text-off-white">izTrack</h1>

      <!-- Navigation Links -->
      <nav class="flex gap-8 items-center">
        <a href="#" class="nav-link text-off-white hover:text-accent-red transition-colors">
          HOME
        </a>
        <a href="#about" class="nav-link text-off-white hover:text-accent-red transition-colors">
          ABOUT
        </a>
        <a href="#contact" class="nav-link text-off-white hover:text-accent-red transition-colors">
          CONTACT
        </a>

        <!-- Auth Section -->
        <div v-if="isAuthenticated" class="flex items-center gap-4">
          <span class="text-sm text-off-white">
            Xin chào, <strong>{{ getUserDisplayName }}</strong>
          </span>
          <Button variant="outline" size="sm" @click="handleLogout">Đăng xuất</Button>
        </div>

        <div v-else class="flex gap-4">
          <Button variant="outline" size="sm" @click="onAuthClick">Đăng nhập</Button>
        </div>

        <button
          class="nav-link text-off-white hover:text-accent-red transition-colors"
          @click="onDonateClick"
        >
          DONATE
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
