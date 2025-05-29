<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
    <div class="flex items-center animate-pulse">
      <div class="flex-shrink-0">
        <USkeleton class="h-10 w-10 rounded-md" />
      </div>

      <div class="ml-5 w-0 flex-1">
        <div class="space-y-2">
          <USkeleton class="h-4 w-20" />
          <div class="flex items-baseline space-x-2">
            <USkeleton class="h-8 w-16" />
            <USkeleton class="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>
