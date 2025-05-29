<template>
  <div class="space-y-6 animate-pulse">
    <!-- Form header -->
    <div class="space-y-2">
      <USkeleton class="h-8 w-48" />
      <USkeleton class="h-4 w-72" />
    </div>

    <!-- Form fields -->
    <div class="space-y-4">
      <div v-for="i in fieldCount" :key="`field-${i}`" class="space-y-2">
        <USkeleton class="h-4 w-20" />
        <USkeleton class="h-10 w-full rounded-md" />
      </div>

      <!-- Special fields (like color picker, file upload, etc.) -->
      <div v-if="includeSpecialFields" class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <USkeleton class="h-4 w-16" />
          <div class="flex gap-2">
            <USkeleton
              v-for="i in 5"
              :key="`color-${i}`"
              class="h-8 w-8 rounded-full"
            />
          </div>
        </div>
        <div class="space-y-2">
          <USkeleton class="h-4 w-20" />
          <USkeleton class="h-10 w-full rounded-md" />
        </div>
      </div>

      <!-- Multi-line field (like textarea) -->
      <div v-if="includeTextarea" class="space-y-2">
        <USkeleton class="h-4 w-16" />
        <USkeleton class="h-24 w-full rounded-md" />
      </div>

      <!-- Tags/chips field -->
      <div v-if="includeTags" class="space-y-2">
        <USkeleton class="h-4 w-12" />
        <div class="flex flex-wrap gap-2">
          <USkeleton
            v-for="i in 3"
            :key="`tag-${i}`"
            class="h-8 w-16 rounded-full"
          />
          <USkeleton class="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>

    <!-- Form actions -->
    <div
      class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700"
    >
      <USkeleton class="h-10 w-20 rounded-md" />
      <USkeleton class="h-10 w-24 rounded-md" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  fieldCount?: number;
  includeSpecialFields?: boolean;
  includeTextarea?: boolean;
  includeTags?: boolean;
}

withDefaults(defineProps<Props>(), {
  fieldCount: 3,
  includeSpecialFields: false,
  includeTextarea: false,
  includeTags: false,
});
</script>
