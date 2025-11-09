<script setup lang="ts">
import Card from '@/components/ui/card.vue';
import CardHeader from '@/components/ui/card-header.vue';
import CardTitle from '@/components/ui/card-title.vue';
import CardContent from '@/components/ui/card-content.vue';
import type { PersonInfo } from '@/types/tracking';

interface Props {
  sender?: PersonInfo;
  receiver?: PersonInfo;
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    <!-- Sender Info -->
    <Card v-if="sender" class="bg-dark-card border-dark-card">
      <CardHeader>
        <CardTitle class="text-lg md:text-xl font-black uppercase text-off-white">
          📤 Người gửi
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div>
          <p class="text-xs font-bold uppercase tracking-wide text-off-white/60">Tên</p>
          <p class="text-base md:text-lg text-off-white mt-1">{{ sender.name }}</p>
        </div>
        <div v-if="sender.phone">
          <p class="text-xs font-bold uppercase tracking-wide text-off-white/60">Số điện thoại</p>
          <p class="text-base md:text-lg text-off-white mt-1">{{ sender.phone }}</p>
        </div>
        <div v-if="sender.address">
          <p class="text-xs font-bold uppercase tracking-wide text-off-white/60">Địa chỉ</p>
          <p class="text-base md:text-lg text-off-white mt-1">{{ sender.address }}</p>
        </div>
      </CardContent>
    </Card>

    <!-- Receiver Info -->
    <Card v-if="receiver" class="bg-dark-card border-dark-card">
      <CardHeader>
        <CardTitle class="text-lg md:text-xl font-black uppercase text-off-white">
          📥 Người nhận
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div>
          <p class="text-xs font-bold uppercase tracking-wide text-off-white/60">Tên</p>
          <p class="text-base md:text-lg text-off-white mt-1">{{ receiver.name }}</p>
        </div>
        <div v-if="receiver.phone">
          <p class="text-xs font-bold uppercase tracking-wide text-off-white/60">Số điện thoại</p>
          <p class="text-base md:text-lg text-off-white mt-1">{{ receiver.phone }}</p>
        </div>
        <div v-if="receiver.address">
          <p class="text-xs font-bold uppercase tracking-wide text-off-white/60">Địa chỉ</p>
          <p class="text-base md:text-lg text-off-white mt-1">{{ receiver.address }}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
