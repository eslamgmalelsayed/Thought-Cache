<template>
  <div
    class="thought-card rounded-lg p-4 shadow-sm h-full flex flex-col"
    :style="{ backgroundColor: thought.color }"
  >
    <!-- Header with actions -->
    <div class="flex items-start justify-between mb-3 flex-shrink-0">
      <div class="flex-1 min-w-0">
        <h3
          class="text-white font-medium text-lg leading-tight mb-2 truncate"
          :title="thought.title"
        >
          {{ truncateTitle(thought.title) }}
        </h3>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center space-x-1 ml-2 flex-shrink-0">
        <UButton
          :icon="thought.isFavorite ? 'lucide:heart' : 'lucide:heart'"
          :class="{
            'text-red-300': thought.isFavorite,
            'text-white/70': !thought.isFavorite,
          }"
          variant="ghost"
          color="white"
          size="xs"
          class="cursor-pointer"
          @click.stop="$emit('toggle-favorite', thought)"
        />
        <UButton
          icon="lucide:more-horizontal"
          variant="ghost"
          color="white"
          size="xs"
          class="cursor-pointer"
          @click.stop
        />
      </div>
    </div>

    <!-- Content (Scrollable) -->
    <div class="flex-1 overflow-y-auto mb-4 min-h-0">
      <div class="text-white/90 text-sm leading-relaxed">
        {{ thought.content }}
      </div>
    </div>

    <!-- Footer -->
    <div class="flex-shrink-0 space-y-3">
      <!-- Tags -->
      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in thought.tags.slice(0, 2)"
          :key="tag.tagId"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white"
        >
          #{{ tag.tag.name }}
        </span>
        <span
          v-if="thought.tags.length > 2"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white"
        >
          +{{ thought.tags.length - 2 }}
        </span>
      </div>

      <!-- Bottom row with category and date -->
      <div class="flex items-center justify-between">
        <!-- Category indicator -->
        <div v-if="thought.category" class="flex items-center">
          <UIcon
            v-if="thought.category.icon"
            :name="thought.category.icon"
            class="h-4 w-4 text-white/70 mr-1"
          />
          <span class="text-white/70 text-xs">
            {{ thought.category.name }}
          </span>
        </div>
        <div v-else class="flex-1"></div>

        <!-- Date -->
        <div class="text-white/70 text-xs">
          {{ formatDate(thought.createdAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @typedef {import('~/types').Thought} Thought
 */

// Props
const _props = defineProps({
  thought: {
    type: Object,
    required: true,
  },
});

// Emits
const _emit = defineEmits(["toggle-favorite", "edit", "delete", "archive"]);

// Format date helper
const formatDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Today";
  } else if (diffDays === 2) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago`;
  } else {
    return d.toLocaleDateString();
  }
};

// Truncate title helper
const truncateTitle = (title) => {
  const maxLength = 50; // Maximum characters for title
  if (title.length <= maxLength) {
    return title;
  }
  return title.substring(0, maxLength).trim() + "...";
};
</script>
