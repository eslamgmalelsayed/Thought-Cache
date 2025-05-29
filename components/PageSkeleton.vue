<template>
  <div class="space-y-6 animate-pulse">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div class="space-y-2">
        <USkeleton class="h-8 w-48" />
        <USkeleton v-if="includeSubtitle" class="h-4 w-72" />
      </div>
      <USkeleton v-if="includeHeaderAction" class="h-10 w-32 rounded-md" />
    </div>

    <!-- Filters/Search section -->
    <div
      v-if="includeFilters"
      class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
    >
      <div class="flex flex-col sm:flex-row gap-4">
        <USkeleton class="h-10 flex-1 rounded-md" />
        <div class="flex gap-2">
          <USkeleton class="h-10 w-32 rounded-md" />
          <USkeleton class="h-10 w-10 rounded-md" />
        </div>
      </div>
    </div>

    <!-- Stats cards -->
    <div
      v-if="includeStats"
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <StatCardSkeleton v-for="i in 4" :key="`page-stat-${i}`" />
    </div>

    <!-- Main content area -->
    <div class="space-y-6">
      <!-- Content type: Grid -->
      <div
        v-if="contentType === 'grid'"
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <ThoughtCardSkeleton
          v-for="i in gridItemCount"
          :key="`grid-${i}`"
          class="break-inside-avoid mb-4"
        />
      </div>

      <!-- Content type: List/Table -->
      <TableSkeleton
        v-else-if="contentType === 'table'"
        :row-count="tableRowCount"
        :include-avatar="includeTableAvatars"
        :include-badge="includeTableBadges"
      />

      <!-- Content type: Form -->
      <div
        v-else-if="contentType === 'form'"
        class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
      >
        <FormSkeleton
          :field-count="formFieldCount"
          :include-special-fields="includeFormSpecialFields"
          :include-textarea="includeFormTextarea"
          :include-tags="includeFormTags"
        />
      </div>

      <!-- Content type: Cards -->
      <div
        v-else-if="contentType === 'cards'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="i in cardCount"
          :key="`card-${i}`"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <USkeleton class="h-6 w-32" />
              <USkeleton class="h-8 w-8 rounded" />
            </div>
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-3/4" />
            <div class="flex justify-between items-center pt-2">
              <USkeleton class="h-4 w-20" />
              <USkeleton class="h-8 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <!-- Default: Mixed content -->
      <div v-else class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <USkeleton class="h-48 rounded-lg" />
          <USkeleton class="h-48 rounded-lg" />
        </div>
        <USkeleton class="h-64 rounded-lg" />
      </div>
    </div>

    <!-- Pagination/Load more -->
    <div v-if="includePagination" class="flex justify-center">
      <div class="flex space-x-2">
        <USkeleton
          v-for="i in 5"
          :key="`pagination-${i}`"
          class="h-10 w-10 rounded"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  contentType?: "grid" | "table" | "form" | "cards" | "mixed";
  includeSubtitle?: boolean;
  includeHeaderAction?: boolean;
  includeFilters?: boolean;
  includeStats?: boolean;
  includePagination?: boolean;

  // Grid specific
  gridItemCount?: number;

  // Table specific
  tableRowCount?: number;
  includeTableAvatars?: boolean;
  includeTableBadges?: boolean;

  // Form specific
  formFieldCount?: number;
  includeFormSpecialFields?: boolean;
  includeFormTextarea?: boolean;
  includeFormTags?: boolean;

  // Cards specific
  cardCount?: number;
}

withDefaults(defineProps<Props>(), {
  contentType: "mixed",
  includeSubtitle: false,
  includeHeaderAction: true,
  includeFilters: false,
  includeStats: false,
  includePagination: false,

  gridItemCount: 8,

  tableRowCount: 6,
  includeTableAvatars: false,
  includeTableBadges: true,

  formFieldCount: 4,
  includeFormSpecialFields: false,
  includeFormTextarea: true,
  includeFormTags: false,

  cardCount: 6,
});
</script>
