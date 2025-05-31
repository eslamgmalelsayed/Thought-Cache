<template>
  <aside
    class="w-64 bg-white dark:bg-gray-800 shadow-sm h-full border-r border-gray-200 dark:border-gray-700"
  >
    <div class="flex flex-col h-full animate-pulse">
      <!-- Logo section -->
      <div
        class="flex items-center p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <USkeleton class="h-8 w-8 rounded mr-3" />
        <USkeleton class="h-6 w-32" />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <div
          v-for="i in 4"
          :key="`nav-skeleton-${i}`"
          class="flex items-center px-3 py-2"
        >
          <USkeleton class="h-5 w-5 rounded mr-3" />
          <USkeleton class="h-4 w-20" />
        </div>
      </nav>

      <!-- User section -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <USkeleton class="h-10 w-10 rounded-full mr-3" />
          <div class="flex-1">
            <USkeleton class="h-4 w-24 mb-1" />
            <USkeleton class="h-3 w-16" />
          </div>
          <USkeleton class="h-5 w-5 rounded" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>
