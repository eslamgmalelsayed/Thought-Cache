<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse"
  >
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <USkeleton class="h-8 w-8 rounded" />
      </div>

      <div class="ml-4 flex-1">
        <USkeleton class="h-5 w-24 mb-2" />
        <USkeleton class="h-4 w-32" />
      </div>

      <div class="ml-4">
        <USkeleton class="h-5 w-5 rounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>
