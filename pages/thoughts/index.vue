<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("thoughts.title") || "Thoughts" }}
      </h1>
      <UButton
        :to="'/thoughts/new'"
        color="primary"
        icon="lucide:plus"
        :label="$t('thoughts.add') || 'Add Thought'"
      />
    </div>

    <!-- Search and Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <UInput
            v-model="searchQuery"
            :placeholder="$t('thoughts.search') || 'Search thoughts...'"
            icon="lucide:search"
            color="gray"
            variant="outline"
            :loading="searching"
            autocomplete="search"
          />
        </div>
        <div class="flex gap-2">
          <USelectMenu
            v-model="selectedCategory"
            :options="categoryOptions"
            placeholder="All Categories"
            value-attribute="id"
            option-attribute="name"
            icon="lucide:tag"
          />
          <UButton
            icon="lucide:filter"
            variant="outline"
            color="gray"
            @click="showFilters = !showFilters"
          />
        </div>
      </div>

      <!-- Advanced Filters -->
      <div
        v-if="showFilters"
        class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <USelectMenu
            v-model="sortBy"
            :options="sortOptions"
            placeholder="Sort by"
            icon="lucide:arrow-up-down"
          />
          <UCheckbox v-model="showFavorites" label="Favorites only" />
          <UCheckbox v-model="showArchived" label="Include archived" />
          <UButton
            variant="outline"
            color="gray"
            icon="lucide:x"
            label="Clear filters"
            @click="clearFilters"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <!-- Stats skeleton -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <USkeleton v-for="i in 3" :key="`stats-${i}`" class="h-20 rounded-lg" />
      </div>

      <!-- Thoughts grid skeleton -->
      <div
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <ThoughtCardSkeleton
          v-for="i in 12"
          :key="`skeleton-${i}`"
          class="break-inside-avoid mb-4"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredThoughts.length === 0" class="text-center py-12">
      <UIcon name="lucide:lightbulb" class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
        {{ searchQuery ? "No thoughts found" : $t("thoughts.empty") }}
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{
          searchQuery
            ? "Try adjusting your search or filters"
            : "Start by adding your first brilliant idea!"
        }}
      </p>
      <UButton
        :to="'/thoughts/new'"
        color="primary"
        class="mt-4"
        icon="lucide:plus"
        :label="$t('thoughts.add') || 'Add Thought'"
      />
    </div>

    <!-- Thoughts Grid -->
    <div v-else class="space-y-6">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div class="flex items-center">
            <UIcon name="lucide:lightbulb" class="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Total Thoughts
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ totalThoughts }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div class="flex items-center">
            <UIcon name="lucide:heart" class="h-8 w-8 text-pink-500 mr-3" />
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Favorites</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ favoriteCount }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div class="flex items-center">
            <UIcon name="lucide:tag" class="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Categories</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ categoriesCount }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Thoughts Masonry Grid -->
      <div
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <ThoughtCard
          v-for="thought in filteredThoughts"
          :key="thought.id"
          :thought="thought"
          class="break-inside-avoid mb-4"
          @click="viewThought"
          @toggle-favorite="toggleFavorite"
          @edit="editThought"
          @delete="deleteThought"
          @archive="archiveThought"
        />
      </div>

      <!-- Load More -->
      <div v-if="hasMoreThoughts" class="text-center">
        <UButton
          variant="outline"
          color="gray"
          :loading="loadingMore"
          icon="lucide:chevron-down"
          label="Load More"
          @click="loadMore"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Thoughts",
  middleware: "auth",
});

// Reactive data
const loading = ref(true);
const searching = ref(false);
const loadingMore = ref(false);
const showFilters = ref(false);

const searchQuery = ref("");
const selectedCategory = ref(null);
const sortBy = ref("createdAt:desc");
const showFavorites = ref(false);
const showArchived = ref(false);

const thoughts = ref([]);
const totalThoughts = ref(0);
const favoriteCount = ref(0);
const categoriesCount = ref(0);
const hasMoreThoughts = ref(true);

// Options
const categoryOptions = ref([
  { id: null, name: "All Categories" },
  { id: "1", name: "Personal" },
  { id: "2", name: "Work" },
  { id: "3", name: "Ideas" },
]);

const sortOptions = [
  { value: "createdAt:desc", label: "Newest First" },
  { value: "createdAt:asc", label: "Oldest First" },
  { value: "title:asc", label: "Title A-Z" },
  { value: "title:desc", label: "Title Z-A" },
  { value: "updatedAt:desc", label: "Recently Updated" },
];

// Computed
const filteredThoughts = computed(() => {
  let filtered = [...thoughts.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (thought) =>
        thought.title.toLowerCase().includes(query) ||
        thought.content.toLowerCase().includes(query)
    );
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(
      (thought) => thought.categoryId === selectedCategory.value
    );
  }

  if (showFavorites.value) {
    filtered = filtered.filter((thought) => thought.isFavorite);
  }

  if (!showArchived.value) {
    filtered = filtered.filter((thought) => !thought.isArchived);
  }

  return filtered;
});

// Methods
const loadThoughts = async () => {
  try {
    loading.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data - this would come from your API
    thoughts.value = [
      {
        id: "1",
        title: "Welcome to Thought Cache",
        content:
          "This is your first thought! You can create, edit, and organize all your ideas here.",
        color: "#3b82f6",
        isArchived: false,
        isFavorite: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "user_1",
        categoryId: "1",
        category: { id: "1", name: "Personal", icon: "lucide:user" },
        tags: [],
      },
      // Add more mock thoughts as needed
    ];

    totalThoughts.value = thoughts.value.length;
    favoriteCount.value = thoughts.value.filter((t) => t.isFavorite).length;
    categoriesCount.value = new Set(
      thoughts.value.map((t) => t.categoryId).filter(Boolean)
    ).size;
  } catch (error) {
    console.error("Failed to load thoughts:", error);
  } finally {
    loading.value = false;
  }
};

const loadMore = async () => {
  loadingMore.value = true;

  // Simulate loading more thoughts
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In real implementation, you'd fetch the next page
  hasMoreThoughts.value = false;
  loadingMore.value = false;
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = null;
  sortBy.value = "createdAt:desc";
  showFavorites.value = false;
  showArchived.value = false;
};

/**
 * Navigate to view a specific thought
 * @param {Object} thought - The thought object
 */
const viewThought = (thought) => {
  navigateTo(`/thoughts/${thought.id}`);
};

/**
 * Toggle the favorite status of a thought
 * @param {Object} thought - The thought object
 */
const toggleFavorite = (thought) => {
  // Toggle favorite logic
  const index = thoughts.value.findIndex((t) => t.id === thought.id);
  if (index !== -1) {
    thoughts.value[index].isFavorite = !thoughts.value[index].isFavorite;
    favoriteCount.value = thoughts.value.filter((t) => t.isFavorite).length;
  }
};

/**
 * Navigate to edit a specific thought
 * @param {Object} thought - The thought object
 */
const editThought = (thought) => {
  navigateTo(`/thoughts/${thought.id}/edit`);
};

/**
 * Delete a specific thought
 * @param {Object} thought - The thought object
 */
const deleteThought = (thought) => {
  // Delete logic with confirmation
  console.log("Delete thought:", thought.id);
};

/**
 * Toggle the archive status of a thought
 * @param {Object} thought - The thought object
 */
const archiveThought = (thought) => {
  // Archive logic
  const index = thoughts.value.findIndex((t) => t.id === thought.id);
  if (index !== -1) {
    thoughts.value[index].isArchived = !thoughts.value[index].isArchived;
  }
};

// Watchers
watch(searchQuery, async (newQuery) => {
  if (newQuery) {
    searching.value = true;
    await new Promise((resolve) => setTimeout(resolve, 500)); // Debounce
    searching.value = false;
  }
});

// Load data on mount
onMounted(() => {
  loadThoughts();
});
</script>
