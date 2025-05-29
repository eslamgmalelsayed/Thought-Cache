<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-pulse"
  >
    <!-- Table header -->
    <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <USkeleton class="h-6 w-32" />
        <USkeleton class="h-8 w-24 rounded-md" />
      </div>
    </div>

    <!-- Table content -->
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <div v-for="i in rowCount" :key="`row-${i}`" class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <USkeleton v-if="includeAvatar" class="h-10 w-10 rounded-full" />
            <div class="space-y-2">
              <USkeleton class="h-5 w-32" />
              <USkeleton v-if="includeSubtext" class="h-4 w-48" />
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <USkeleton v-if="includeBadge" class="h-6 w-16 rounded-full" />
            <USkeleton v-if="includeActions" class="h-8 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>

    <!-- Table footer/pagination -->
    <div
      v-if="includePagination"
      class="border-t border-gray-200 dark:border-gray-700 px-6 py-4"
    >
      <div class="flex items-center justify-between">
        <USkeleton class="h-4 w-40" />
        <div class="flex space-x-2">
          <USkeleton
            v-for="i in 3"
            :key="`page-${i}`"
            class="h-8 w-8 rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rowCount?: number;
  includeAvatar?: boolean;
  includeSubtext?: boolean;
  includeBadge?: boolean;
  includeActions?: boolean;
  includePagination?: boolean;
}

withDefaults(defineProps<Props>(), {
  rowCount: 5,
  includeAvatar: false,
  includeSubtext: true,
  includeBadge: true,
  includeActions: true,
  includePagination: true,
});
</script>
