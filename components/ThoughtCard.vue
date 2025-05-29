<template>
  <div
    class="thought-card rounded-lg p-4 shadow-sm cursor-pointer"
    :style="{ backgroundColor: thought.color }"
    @click="$emit('click', thought)"
  >
    <!-- Header with actions -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <h3 class="text-white font-medium text-lg leading-tight mb-2">
          {{ thought.title }}
        </h3>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center space-x-1 ml-2">
        <UButton
          :icon="thought.isFavorite ? 'lucide:heart-filled' : 'lucide:heart'"
          variant="ghost"
          color="white"
          size="xs"
          @click.stop="$emit('toggle-favorite', thought)"
        />
        <UButton
          icon="lucide:more-horizontal"
          variant="ghost"
          color="white"
          size="xs"
          @click.stop
        />
      </div>
    </div>

    <!-- Content -->
    <div class="text-white/90 text-sm mb-4 line-clamp-4">
      {{ thought.content }}
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between">
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

      <!-- Date -->
      <div class="text-white/70 text-xs">
        {{ formatDate(thought.createdAt) }}
      </div>
    </div>

    <!-- Category indicator -->
    <div v-if="thought.category" class="mt-3 flex items-center">
      <UIcon
        v-if="thought.category.icon"
        :name="thought.category.icon"
        class="h-4 w-4 text-white/70 mr-1"
      />
      <span class="text-white/70 text-xs">
        {{ thought.category.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  thought: any;
}>();

// Emits
const emit = defineEmits<{
  click: [thought: any];
  "toggle-favorite": [thought: any];
  edit: [thought: any];
  delete: [thought: any];
  archive: [thought: any];
}>();

// Action menu items
const actionItems = computed(() => [
  [
    {
      label: "Edit",
      icon: "lucide:edit",
      click: () => emit("edit", props.thought),
    },
  ],
  [
    {
      label: "Archive",
      icon: "lucide:archive",
      click: () => emit("archive", props.thought),
    },
  ],
  [
    {
      label: "Delete",
      icon: "lucide:trash",
      click: () => emit("delete", props.thought),
    },
  ],
]);

// Format date helper
const formatDate = (date: Date | string) => {
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
</script>
