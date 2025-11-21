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
  <header class="sticky top-0 z-50 border-b backdrop-blur-sm" style="background-color: rgba(255, 255, 255, 0.9); border-color: var(--color-border); box-shadow: var(--shadow-sm)">
    <div class="section-container">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl" style="background-color: var(--color-accent); color: white">
            iz
          </div>
          <span class="text-2xl font-bold" style="color: var(--color-text-primary)">Track</span>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex gap-8 items-center">
          <a href="#" class="nav-link-modern">Home</a>
          <a href="#about" class="nav-link-modern">About</a>
          <a href="#contact" class="nav-link-modern">Contact</a>

          <!-- Auth Section -->
          <div v-if="isAuthenticated" class="flex items-center gap-3">
            <div class="px-3 py-1.5 rounded-full" style="background-color: var(--color-primary-bg)">
              <span class="text-sm font-medium" style="color: var(--color-text-secondary)">
                {{ getUserDisplayName }}
              </span>
            </div>
            <Button variant="outline" size="sm" @click="handleLogout">Logout</Button>
          </div>

          <div v-else class="flex gap-3">
            <Button variant="outline" size="sm" @click="onAuthClick">Sign In</Button>
          </div>

          <button
            class="btn-donate"
            @click="onDonateClick"
          >
            Donate
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link-modern {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
  position: relative;
}

.nav-link-modern:hover {
  color: var(--color-accent);
}

.nav-link-modern::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width 0.2s ease;
}

.nav-link-modern:hover::after {
  width: 100%;
}

.btn-donate {
  padding: 0.5rem 1.25rem;
  background-color: var(--color-accent);
  color: white;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  box-shadow: var(--shadow-sm);
}

.btn-donate:hover {
  background-color: var(--color-accent-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}
</style>
