<template>
  <header
    class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between animate-pulse">
        <!-- Left section -->
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <USkeleton class="h-8 w-8 rounded lg:hidden mr-4" />

          <!-- Breadcrumbs -->
          <nav class="hidden lg:flex items-center ml-4 space-x-2">
            <USkeleton class="h-4 w-16" />
            <USkeleton class="h-3 w-3 rounded-full" />
            <USkeleton class="h-4 w-20" />
          </nav>
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

          <!-- Notifications -->
          <USkeleton class="h-8 w-8 rounded" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>
