<template>
  <div class="animate-pulse">
    <!-- User Profile Section -->
    <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-4">
      <div class="flex items-center mb-3">
        <!-- Avatar skeleton -->
        <USkeleton class="h-8 w-8 rounded-full" />
        
        <!-- User info skeleton -->
        <div class="ml-3 flex-1 min-w-0 space-y-1">
          <USkeleton class="h-4 w-24" />
          <USkeleton class="h-3 w-32" />
        </div>
      </div>

      <!-- Sign out button skeleton -->
      <USkeleton class="h-8 w-full rounded-md" />
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for this simple skeleton
</script> 