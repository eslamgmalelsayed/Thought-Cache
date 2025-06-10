<template>
  <div class="space-y-6">
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
          :title="'Favorites'"
          :value="stats.favoriteThoughts"
          icon="lucide:heart"
          color="red"
        />
        <StatCard
          :title="'This Month'"
          :value="stats.monthlyThoughts"
          icon="lucide:calendar"
          color="purple"
          :trend="stats.monthlyTrend"
        />
        <StatCard
          :title="'Tags Used'"
          :value="stats.totalTags"
          icon="lucide:hash"
          color="green"
        />
      </template>
    </div>

    <!-- Search -->
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
          <UButton
            :variant="showFavorites ? 'solid' : 'outline'"
            color="red"
            icon="lucide:heart"
            class="cursor-pointer"
            @click="showFavorites = !showFavorites"
          >
            {{ showFavorites ? "All" : "Favorites" }}
          </UButton>
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
      <UButton
        color="primary"
        class="mt-4 cursor-pointer"
        icon="lucide:plus"
        :label="$t('thoughts.add') || 'Add Thought'"
        @click="openAddModal"
      />
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

    <!-- Single Modal for Add/Edit -->
    <ThoughtModal
      :is-open-modal="showModal"
      :is-edit="!!currentThought"
      :thought-data="currentThought"
      :loading="savingThought"
      @close="closeModal"
      @submit="handleThoughtSubmit"
    />
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: "Dashboard",
  middleware: "auth",
});

// Auth
const { user, isLoaded, isSignedIn } = useAuth();
const { db } = useSupabase();

// Data loading states
const loadingStats = ref(true);
const loadingThoughts = ref(true);
const loadingActions = ref(true);
const searching = ref(false);
const loadingMore = ref(false);
const savingThought = ref(false);

// Modal state
const showModal = ref(false);
const currentThought = ref(null);

// Search and filter state
const searchQuery = ref("");
const showFavorites = ref(false);

// Data
const thoughts = ref([]);
const recentThoughts = ref([]);
const hasMoreThoughts = ref(true);

const stats = ref({
  totalThoughts: 0,
  favoriteThoughts: 0,
  monthlyThoughts: 0,
  totalTags: 0,
  thoughtsTrend: "+12%",
  monthlyTrend: "+8%",
});

// Computed
const filteredThoughts = computed(() => {
  let filtered = [...thoughts.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (thought) =>
        thought.title.toLowerCase().includes(query) ||
        thought.content.toLowerCase().includes(query) ||
        thought.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (showFavorites.value) {
    filtered = filtered.filter((thought) => thought.isFavorite);
  }

  return filtered;
});

// Load dashboard data
const loadDashboardData = async () => {
  try {
    // Wait for auth to load
    if (!isLoaded.value) {
      console.log("Auth still loading, skipping data load");
      return;
    }

    if (!isSignedIn.value || !user?.value?.id) {
      console.log("User not authenticated, skipping data load");
      return;
    }

    // Fetch user's thoughts from Supabase
    console.log("Loading thoughts from Supabase for user:", user.value.id);
    const { data: userThoughts, error } = await db.thoughts.getByUserId(
      user.value.id
    );

    if (error) {
      throw error;
    }

    thoughts.value = userThoughts || [];
    recentThoughts.value = userThoughts || [];

    console.log("Loaded thoughts:", thoughts.value.length);

    // Update stats with actual data
    updateStats();

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
 * Open modal for editing a thought
 * @param {Object} thought - The thought object
 */
const editThought = (thought) => {
  currentThought.value = thought;
  showModal.value = true;
};

/**
 * Open modal for adding a new thought
 */
const openAddModal = () => {
  currentThought.value = null;
  showModal.value = true;
};

/**
 * Close modal and reset state
 */
const closeModal = () => {
  showModal.value = false;
  currentThought.value = null;
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
 * Handle both adding and editing thoughts
 * @param {Object} data - The thought form data
 */
const handleThoughtSubmit = async (data) => {
  const isEdit = !!currentThought.value;
  console.log(`${isEdit ? "Edit" : "Add"} thought called with:`, data);

  try {
    savingThought.value = true;

    // Wait for auth to load and check if user is signed in
    if (!isLoaded.value) {
      throw new Error("Authentication still loading, please wait");
    }

    if (!isSignedIn.value || !user?.value?.id) {
      throw new Error("User not authenticated");
    }

    console.log("User authenticated:", user.value.id);

    if (isEdit) {
      // Update existing thought in Supabase
      console.log("Updating thought in Supabase:", data);
      const { data: updatedThought, error } = await db.thoughts.update(
        currentThought.value.id,
        {
          title: data.title,
          content: data.content,
          color: data.color,
          tags: data.tags,
          updated_at: new Date().toISOString(),
        }
      );

      if (error) {
        throw error;
      }

      // Update local state
      const index = thoughts.value.findIndex(
        (t) => t.id === currentThought.value.id
      );
      if (index !== -1) {
        thoughts.value[index] = updatedThought;
      }
      console.log("Thought updated successfully!");
    } else {
      // Create new thought in Supabase
      console.log("Creating thought in Supabase:", data);
      const { data: newThought, error } = await db.thoughts.create({
        title: data.title,
        content: data.content,
        color: data.color,
        tags: data.tags,
        user_id: user.value.id,
        is_favorite: false,
      });

      if (error) {
        throw error;
      }

      console.log("New thought created in Supabase:", newThought);
      thoughts.value.unshift(newThought);
      console.log("Thought created successfully!");
    }

    // Update stats
    updateStats();

    // Close modal
    closeModal();
  } catch (error) {
    console.error(`Failed to ${isEdit ? "update" : "create"} thought:`, error);
    // TODO: Show user-friendly error message (toast notification)
    alert(
      `Failed to ${isEdit ? "update" : "create"} thought: ${error.message}`
    );
  } finally {
    savingThought.value = false;
  }
};

/**
 * Update statistics
 */
const updateStats = () => {
  const allTags = thoughts.value.flatMap((t) => t.tags);
  const uniqueTags = [...new Set(allTags)];

  stats.value.totalThoughts = thoughts.value.length;
  stats.value.favoriteThoughts = thoughts.value.filter(
    (t) => t.isFavorite
  ).length;
  stats.value.totalTags = uniqueTags.length;
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

// Watch for user authentication changes and reload data
watch(
  [isLoaded, isSignedIn, user],
  ([loaded, signedIn, currentUser]) => {
    if (loaded && signedIn && currentUser?.id) {
      console.log("User authenticated, loading dashboard data");
      loadDashboardData();
    }
  },
  { immediate: true }
);
</script>
