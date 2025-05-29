<template>
  <div
    class="rounded-lg p-4 shadow-sm bg-gray-300 dark:bg-gray-600 animate-pulse"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <USkeleton class="h-6 w-3/4 bg-white/30" />
      </div>

      <!-- Action buttons -->
      <div class="flex items-center space-x-1 ml-2">
        <USkeleton class="h-6 w-6 rounded bg-white/30" />
        <USkeleton class="h-6 w-6 rounded bg-white/30" />
      </div>
    </div>

    <!-- Content -->
    <div class="mb-4 space-y-2">
      <USkeleton class="h-4 w-full bg-white/30" />
      <USkeleton class="h-4 w-5/6 bg-white/30" />
      <USkeleton class="h-4 w-4/6 bg-white/30" />
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between">
      <!-- Tags -->
      <div class="flex gap-1">
        <USkeleton class="h-6 w-12 rounded-full bg-white/30" />
        <USkeleton class="h-6 w-16 rounded-full bg-white/30" />
      </div>

      <!-- Date -->
      <USkeleton class="h-4 w-16 bg-white/30" />
    </div>

    <!-- Category -->
    <div class="mt-3 flex items-center">
      <USkeleton class="h-4 w-4 rounded mr-1 bg-white/30" />
      <USkeleton class="h-4 w-20 bg-white/30" />
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>
