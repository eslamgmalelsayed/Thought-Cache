<template>
  <header
    class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between animate-pulse">
        <!-- Left section -->
        <div class="flex items-center">
          <!-- App logo/title -->
          <div class="flex items-center">
            <USkeleton class="h-8 w-8 rounded mr-3" />
            <USkeleton class="h-6 w-32" />
          </div>
        </div>

        <!-- Center section - Search -->
        <div
          class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
        >
          <div class="w-full max-w-lg lg:max-w-xs">
            <USkeleton class="h-10 w-full rounded-md" />
          </div>
        </div>

        <!-- Right section -->
        <div class="flex items-center space-x-4">
          <!-- Quick actions -->
          <USkeleton class="h-10 w-32 rounded-md hidden sm:block" />

          <!-- Mobile add button -->
          <USkeleton class="h-10 w-10 rounded-md sm:hidden" />

          <!-- User Avatar -->
          <USkeleton class="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>
