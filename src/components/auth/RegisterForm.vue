<template>
  <Card class="w-full max-w-md bg-dark-card border-dark-card">
    <CardHeader>
      <CardTitle class="text-off-white text-2xl font-bold">ĐĂNG KÝ</CardTitle>
      <CardDescription class="text-off-white/60">Tạo tài khoản mới</CardDescription>
    </CardHeader>

    <CardContent>
      <form class="space-y-4" @submit.prevent="handleRegister">
        <!-- Google Sign-In Button -->
        <Button
          type="button"
          variant="outline"
          class="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
          :disabled="loading"
          @click="handleGoogleSignUp"
        >
          <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span v-if="loading">Đang đăng ký...</span>
          <span v-else>Đăng ký bằng Google</span>
        </Button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-off-white/20"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-dark-card px-2 text-off-white/60">Hoặc</span>
          </div>
        </div>

        <!-- Display Name Input -->
        <div class="space-y-2">
          <label for="register-name" class="text-sm font-medium leading-none text-off-white">
            Tên hiển thị
          </label>
          <Input
            id="register-name"
            v-model="formData.displayName"
            type="text"
            placeholder="Nguyễn Văn A"
            required
            autocomplete="name"
            :disabled="loading"
            class="bg-dark-bg border-off-white/20 text-off-white placeholder:text-off-white/40"
          />
        </div>

        <!-- Email Input -->
        <div class="space-y-2">
          <label for="register-email" class="text-sm font-medium leading-none text-off-white">
            Email
          </label>
          <Input
            id="register-email"
            v-model="formData.email"
            type="email"
            placeholder="example@email.com"
            required
            autocomplete="email"
            :disabled="loading"
            class="bg-dark-bg border-off-white/20 text-off-white placeholder:text-off-white/40"
          />
        </div>

        <!-- Password Input -->
        <div class="space-y-2">
          <label for="register-password" class="text-sm font-medium leading-none text-off-white">
            Mật khẩu (tối thiểu 6 ký tự)
          </label>
          <Input
            id="register-password"
            v-model="formData.password"
            type="password"
            placeholder="••••••••"
            required
            minlength="6"
            autocomplete="new-password"
            :disabled="loading"
            class="bg-dark-bg border-off-white/20 text-off-white placeholder:text-off-white/40"
          />
        </div>

        <!-- Confirm Password Input -->
        <div class="space-y-2">
          <label
            for="register-confirm-password"
            class="text-sm font-medium leading-none text-off-white"
          >
            Xác nhận mật khẩu
          </label>
          <Input
            id="register-confirm-password"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            minlength="6"
            autocomplete="new-password"
            :disabled="loading"
            class="bg-dark-bg border-off-white/20 text-off-white placeholder:text-off-white/40"
          />
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-800/50"
        >
          {{ error }}
        </div>

        <!-- Success Message -->
        <div
          v-if="success"
          class="text-sm text-green-400 bg-green-900/20 p-3 rounded-md border border-green-800/50"
        >
          Đăng ký thành công! Đang chuyển hướng...
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          class="w-full bg-accent-red hover:bg-accent-red-dark text-off-white font-bold uppercase tracking-wide"
          :disabled="loading"
        >
          <span v-if="loading">Đang đăng ký...</span>
          <span v-else>Đăng ký</span>
        </Button>

        <!-- Login Link -->
        <div class="text-center text-sm text-off-white/60">
          Đã có tài khoản?
          <button
            type="button"
            class="text-accent-red hover:text-accent-red-dark font-medium transition-colors"
            @click="$emit('switch-to-login')"
          >
            Đăng nhập ngay
          </button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';

const emits = defineEmits<{
  'switch-to-login': [];
  'register-success': [];
}>();

const { register, loginWithGoogle } = useAuth();

const formData = reactive({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const loading = ref(false);
const error = ref<string | null>(null);
const success = ref(false);

const handleRegister = async () => {
  error.value = null;
  success.value = false;

  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    error.value = 'Mật khẩu xác nhận không khớp';
    return;
  }

  // Validate password length
  if (formData.password.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự';
    return;
  }

  loading.value = true;

  try {
    const result = await register(formData.email, formData.password, formData.displayName);

    if (result.success) {
      success.value = true;
      // Reset form
      formData.displayName = '';
      formData.email = '';
      formData.password = '';
      formData.confirmPassword = '';

      // Emit success event after a short delay
      window.setTimeout(() => {
        emits('register-success');
      }, 1500);
    } else {
      error.value = result.error || 'Đăng ký thất bại';
    }
  } finally {
    loading.value = false;
  }
};

const handleGoogleSignUp = async () => {
  error.value = null;
  loading.value = true;

  try {
    const result = await loginWithGoogle();

    if (result.success) {
      success.value = true;
      window.setTimeout(() => {
        emits('register-success');
      }, 500);
    } else {
      error.value = result.error || 'Đăng ký bằng Google thất bại';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
