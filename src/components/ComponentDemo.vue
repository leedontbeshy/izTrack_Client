<script setup lang="ts">
import { ref } from 'vue';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@/components/ui';

const inputValue = ref('');
</script>

<template>
  <div class="w-full max-w-2xl space-y-8">
    <Card>
      <CardHeader>
        <CardTitle>shadcn-vue Components Demo</CardTitle>
        <CardDescription>
          Testing Button, Input, Card, and Badge components with dark theme
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Buttons -->
        <div class="space-y-3">
          <h4 class="text-sm font-bold uppercase text-[#f0ede5]/60">Buttons</h4>
          <div class="flex flex-wrap gap-3">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <!-- Input -->
        <div class="space-y-3">
          <h4 class="text-sm font-bold uppercase text-[#f0ede5]/60">Input</h4>
          <Input
            v-model="inputValue"
            placeholder="Enter tracking code"
            class="text-center uppercase text-xl font-bold"
          />
          <p v-if="inputValue" class="text-sm text-[#f0ede5]/60">You entered: {{ inputValue }}</p>
        </div>

        <!-- Badges -->
        <div class="space-y-3">
          <h4 class="text-sm font-bold uppercase text-[#f0ede5]/60">Badges</h4>
          <div class="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
