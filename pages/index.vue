<template>
  <div class="space-y-6">
    <!-- Welcome header -->
    <div
      class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">
            {{ $t("auth.welcome") }}
          </h1>
          <p class="mt-2 text-primary-100">
            {{ $t("app.description") }}
          </p>
        </div>
        <UModal>
          <UButton
            color="white"
            variant="solid"
            icon="lucide:plus"
            :label="$t('thoughts.add') || 'Add Thought'"
            class="hidden sm:flex cursor-pointer"
          />

          <template #content>
            <UCard
              :ui="{
                ring: '',
                divide: 'divide-y divide-gray-200 dark:divide-gray-700',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {{ $t("thoughts.add") || "Add New Thought" }}
                  </h3>
                </div>
              </template>

              <ThoughtForm
                :loading="savingThought"
                :category-options="categoryOptions"
                @submit="handleAddThought"
              />
            </UCard>
          </template>
        </UModal>

        <UModal>
          <UButton
            color="white"
            variant="solid"
            icon="lucide:plus"
            class="sm:hidden cursor-pointer"
          />

          <template #content>
            <UCard
              :ui="{
                ring: '',
                divide: 'divide-y divide-gray-200 dark:divide-gray-700',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {{ $t("thoughts.add") || "Add New Thought" }}
                  </h3>
                </div>
              </template>

              <ThoughtForm
                :loading="savingThought"
                :category-options="categoryOptions"
                @submit="handleAddThought"
              />
            </UCard>
          </template>
        </UModal>
      </div>
    </div>

    <!-- Statistics cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <template v-if="loadingStats">
        <StatCardSkeleton v-for="i in 4" :key="`stat-skeleton-${i}`" />
      </template>
      <template v-else>
        <StatCard
          :title="$t('thoughts.title')"
          :value="stats.totalThoughts"
          icon="lucide:lightbulb"
          color="blue"
          :trend="stats.thoughtsTrend"
        />
        <StatCard
          :title="$t('categories.title')"
          :value="stats.totalCategories"
          icon="lucide:tag"
          color="green"
        />
        <StatCard
          :title="'Favorites'"
          :value="stats.favoriteThoughts"
          icon="lucide:heart"
          color="pink"
        />
        <StatCard
          :title="'This Month'"
          :value="stats.monthlyThoughts"
          icon="lucide:calendar"
          color="purple"
          :trend="stats.monthlyTrend"
        />
      </template>
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
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loadingThoughts" class="space-y-6">
      <!-- Thoughts grid skeleton -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <ThoughtCardSkeleton
          v-for="i in 12"
          :key="`skeleton-${i}`"
          class="h-80"
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
      <UModal>
        <UButton
          color="primary"
          class="mt-4 cursor-pointer"
          icon="lucide:plus"
          :label="$t('thoughts.add') || 'Add Thought'"
        />

        <template #content>
          <UCard
            :ui="{
              ring: '',
              divide: 'divide-y divide-gray-200 dark:divide-gray-700',
            }"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ $t("thoughts.add") || "Add New Thought" }}
                </h3>
              </div>
            </template>

            <ThoughtForm
              :loading="savingThought"
              :category-options="categoryOptions"
              @submit="handleAddThought"
            />
          </UCard>
        </template>
      </UModal>
    </div>

    <!-- Thoughts Grid -->
    <div v-else class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ searchQuery ? "Search Results" : "Recent Thoughts" }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ filteredThoughts.length }}
          {{ filteredThoughts.length === 1 ? "thought" : "thoughts" }}
        </p>
      </div>

      <!-- Thoughts Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <ThoughtCard
          v-for="thought in filteredThoughts"
          :key="thought.id"
          :thought="thought"
          class="h-80"
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
          class="cursor-pointer"
          @click="loadMore"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: "Dashboard",
  middleware: "auth",
});

// Data loading states
const loadingStats = ref(true);
const loadingThoughts = ref(true);
const loadingActions = ref(true);
const searching = ref(false);
const loadingMore = ref(false);
const savingThought = ref(false);

// Search and filter state
const searchQuery = ref("");
const selectedCategory = ref(null);
const showFavorites = ref(false);
const showArchived = ref(false);

// Data
const thoughts = ref([]);
const recentThoughts = ref([]);
const hasMoreThoughts = ref(true);

const stats = ref({
  totalThoughts: 0,
  totalCategories: 0,
  favoriteThoughts: 0,
  monthlyThoughts: 0,
  thoughtsTrend: "+12%",
  monthlyTrend: "+8%",
});

// Options
const categoryOptions = ref([
  { id: null, name: "All Categories" },
  { id: "1", name: "Personal" },
  { id: "2", name: "Work" },
  { id: "3", name: "Ideas" },
]);

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

// Load dashboard data
const loadDashboardData = async () => {
  try {
    // Fetch recent thoughts and stats with realistic loading simulation
    const [thoughtsResponse, statsResponse] = await Promise.all([
      $fetch("/api/thoughts?limit=20&sort=createdAt:desc"),
      $fetch("/api/stats/dashboard"),
    ]);

    thoughts.value = thoughtsResponse.data || [];
    recentThoughts.value = thoughtsResponse.data || [];
    stats.value = {
      ...stats.value,
      ...statsResponse.data,
      totalThoughts: thoughts.value.length,
      favoriteThoughts: thoughts.value.filter((t) => t.isFavorite).length,
    };

    // Simulate staggered loading for better UX
    setTimeout(() => {
      loadingStats.value = false;
    }, 800);

    setTimeout(() => {
      loadingActions.value = false;
    }, 1000);

    setTimeout(() => {
      loadingThoughts.value = false;
    }, 1200);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    // Handle error with toast notification
    loadingStats.value = false;
    loadingActions.value = false;
    loadingThoughts.value = false;
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

/**
 * Toggle the favorite status of a thought
 * @param {Object} thought - The thought object
 */
const toggleFavorite = (thought) => {
  // Toggle favorite logic
  const index = thoughts.value.findIndex((t) => t.id === thought.id);
  if (index !== -1) {
    thoughts.value[index].isFavorite = !thoughts.value[index].isFavorite;
    stats.value.favoriteThoughts = thoughts.value.filter(
      (t) => t.isFavorite
    ).length;
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

/**
 * Handle adding a new thought
 * @param {Object} data - The thought form data
 */
const handleAddThought = async (data) => {
  try {
    savingThought.value = true;

    // Simulate API call to create thought
    console.log("Creating thought:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create new thought object
    const newThought = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      color: data.color,
      isArchived: false,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "user_1",
      categoryId: data.categoryId || null,
      category: data.categoryId
        ? categoryOptions.value.find((c) => c.id === data.categoryId)
        : null,
      tags: data.tags.map((tagName, index) => ({
        thoughtId: Date.now().toString(),
        tagId: `tag_${Date.now()}_${index}`,
        tag: {
          id: `tag_${Date.now()}_${index}`,
          name: tagName,
          createdAt: new Date(),
        },
      })),
    };

    // Add to thoughts array
    thoughts.value.unshift(newThought);

    // Update stats
    stats.value.totalThoughts = thoughts.value.length;
    stats.value.favoriteThoughts = thoughts.value.filter(
      (t) => t.isFavorite
    ).length;

    // Show success message (you could use a toast notification here)
    console.log("Thought created successfully!");
  } catch (error) {
    console.error("Failed to create thought:", error);
    // Handle error (show error message)
  } finally {
    savingThought.value = false;
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
  // Check for search query from URL params
  const route = useRoute();
  if (route.query.search) {
    searchQuery.value = String(route.query.search);
  }

  loadDashboardData();
});
</script>
