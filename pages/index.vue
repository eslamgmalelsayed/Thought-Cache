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
          :title="$t('thoughts.favorites') || 'Favorites'"
          :value="stats.favoriteThoughts"
          icon="lucide:heart"
          color="red"
        />
        <StatCard
          :title="$t('stats.thisMonth') || 'This Month'"
          :value="stats.monthlyThoughts"
          icon="lucide:calendar"
          color="purple"
          :trend="stats.monthlyTrend"
        />
        <StatCard
          :title="$t('stats.tagsUsed') || 'Tags Used'"
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
            {{ showFavorites ? ($t('thoughts.all') || "All") : ($t('thoughts.favorites') || "Favorites") }}
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
        {{ searchQuery ? ($t("thoughts.noResults") || "No thoughts found") : $t("thoughts.empty") }}
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{
          searchQuery
            ? ($t("thoughts.tryAdjusting") || "Try adjusting your search or filters")
            : ($t("thoughts.startAdding") || "Start by adding your first brilliant idea!")
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
          {{ searchQuery ? $t('thoughts.searchResults') || "Search Results" : $t('thoughts.recent') || "Recent Thoughts" }}
        </h2>
        <div class="flex items-center gap-3">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ filteredThoughts.length }}
            {{ filteredThoughts.length === 1 ? ($t('thoughts.thoughtSingle') || "thought") : ($t('thoughts.thoughtPlural') || "thoughts") }}
          </p>
          <UButton
            color="primary"
            size="sm"
            icon="lucide:plus"
            :label="$t('thoughts.add') || 'Add Thought'"
            class="cursor-pointer"
            @click="openAddModal"
          />
        </div>
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
          :label="$t('ui.loadMore') || 'Load More'"
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

// i18n
const { t: _t } = useI18n();

// Alternative Clerk access
const clerkUser = ref(null);
const clerkLoaded = ref(false);
const clerkSignedIn = ref(false);

// Check Clerk directly
const checkClerkAuth = () => {
  if (import.meta.client && window.Clerk) {
    clerkLoaded.value = window.Clerk.loaded || false;
    clerkSignedIn.value = !!window.Clerk.user;
    clerkUser.value = window.Clerk.user || null;
  }
};

// Watch for Clerk changes
if (import.meta.client) {
  onMounted(() => {
    checkClerkAuth();
    
    // Set up interval to check Clerk status
    const interval = setInterval(() => {
      checkClerkAuth();
    }, 1000);
    
    onUnmounted(() => {
      clearInterval(interval);
    });
  });
}

// Computed property to safely access user ID (try both sources)
const userId = computed(() => {
  // Try useAuth first
  const authUserId = user?.value?.id || user?.value?.userId;
  if (authUserId) return authUserId;
  
  // Try direct Clerk access
  const clerkUserId = clerkUser.value?.id || clerkUser.value?.userId;
  if (clerkUserId) return clerkUserId;
  
  return null;
});

// Computed property to safely access user email (try both sources)
const _userEmail = computed(() => {
  // Try useAuth first
  const authEmail = user?.value?.emailAddresses?.[0]?.emailAddress || 
                   user?.value?.primaryEmailAddress?.emailAddress ||
                   user?.value?.email;
  if (authEmail) return authEmail;
  
  // Try direct Clerk access - based on the structure you showed
  const clerkEmail = clerkUser.value?.primaryEmailAddress?.emailAddress ||
                    clerkUser.value?.emailAddresses?.[0]?.emailAddress ||
                    clerkUser.value?.email;
  if (clerkEmail) return clerkEmail;
  
  return null;
});

// Computed property for user display name
const userDisplayName = computed(() => {
  // Try useAuth first
  const authName = user?.value?.fullName || user?.value?.firstName || user?.value?.name;
  if (authName) return authName;
  
  // Try direct Clerk access
  const clerkName = clerkUser.value?.fullName || clerkUser.value?.firstName || clerkUser.value?.name;
  if (clerkName) return clerkName;
  
  return 'User';
});

// Computed property for user avatar URL
const _userAvatarUrl = computed(() => {
  // Try useAuth first
  const authAvatar = user?.value?.imageUrl || user?.value?.profileImageUrl || user?.value?.avatar;
  if (authAvatar) return authAvatar;
  
  // Try direct Clerk access
  const clerkAvatar = clerkUser.value?.imageUrl || clerkUser.value?.profileImageUrl || clerkUser.value?.avatar;
  if (clerkAvatar) return clerkAvatar;
  
  return null;
});

// Computed property for user initials
const _userInitials = computed(() => {
  // Try useAuth first
  let firstName = user?.value?.firstName || '';
  let lastName = user?.value?.lastName || '';
  
  // Try direct Clerk access if useAuth doesn't have the data
  if (!firstName && !lastName) {
    firstName = clerkUser.value?.firstName || '';
    lastName = clerkUser.value?.lastName || '';
  }
  
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  } else if (firstName) {
    return firstName.charAt(0).toUpperCase();
  } else if (userDisplayName.value && userDisplayName.value !== 'User') {
    const names = userDisplayName.value.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return names[0].charAt(0).toUpperCase();
  }
  
  return 'U';
});

// Computed property for member since date
const _formatMemberSince = computed(() => {
  // Try useAuth first
  let createdAt = user?.value?.createdAt;
  
  // Try direct Clerk access
  if (!createdAt) {
    createdAt = clerkUser.value?.createdAt;
  }
  
  if (createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }
  
  return 'Recently';
});

// Computed for overall auth status
const isAuthLoaded = computed(() => isLoaded.value || clerkLoaded.value);
const isUserSignedIn = computed(() => isSignedIn.value || clerkSignedIn.value);
const { db: _db } = useSupabase();

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
    // Wait for auth to load with timeout
    let authCheckAttempts = 0;
    const maxAuthAttempts = 50; // 5 seconds max wait
    
    while (!isAuthLoaded.value && authCheckAttempts < maxAuthAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      authCheckAttempts++;
    }

    if (!isAuthLoaded.value) {
      finishLoading();
      return;
    }

    if (!isUserSignedIn.value || !userId.value) {
      finishLoading();
      return;
    }

    // Fetch user's thoughts via API
    const response = await $fetch('/api/thoughts');

    if (response.success) {
      // Filter thoughts for the current user and transform property names
      const userThoughts = response.data
        .filter(thought => thought.user_id === userId.value)
        .map(thought => ({
          ...thought,
          isFavorite: thought.is_favorite // Transform snake_case to camelCase
        }));
      thoughts.value = userThoughts || [];
      recentThoughts.value = userThoughts || [];
    } else {
      thoughts.value = [];
      recentThoughts.value = [];
    }

    // Update stats with actual data
    updateStats();

    // Finish loading
    finishLoading();
  } catch {
    thoughts.value = [];
    recentThoughts.value = [];
    finishLoading();
  }
};



// Finish loading with staggered animation
const finishLoading = () => {
  // Simulate staggered loading for better UX
  setTimeout(() => {
    loadingStats.value = false;
  }, 300);

  setTimeout(() => {
    loadingActions.value = false;
  }, 500);

  setTimeout(() => {
    loadingThoughts.value = false;
  }, 700);
};

const loadMore = async () => {
  try {
    if (!isUserSignedIn.value || !userId.value) {
      return;
    }

    loadingMore.value = true;

    // For now, we'll just set hasMoreThoughts to false since we're loading all thoughts at once
    // In a real implementation, you'd implement pagination here
    hasMoreThoughts.value = false;
  } catch {
    // Error loading more thoughts
  } finally {
    loadingMore.value = false;
  }
};

/**
 * Toggle the favorite status of a thought
 * @param {Object} thought - The thought object
 */
const toggleFavorite = async (thought) => {
  try {
    if (!isUserSignedIn.value || !userId.value) {
      alert('Please sign in to toggle favorites');
      return;
    }

    const newFavoriteStatus = !thought.isFavorite;
    
    // Update in database
    const response = await $fetch(`/api/thoughts/${thought.id}`, {
      method: 'PUT',
      body: { is_favorite: newFavoriteStatus }
    });
    if (!response.success) {
      throw new Error('Failed to update favorite status');
    }

    // Update local state
    const index = thoughts.value.findIndex((t) => t.id === thought.id);
    if (index !== -1) {
      thoughts.value[index] = {
        ...thoughts.value[index],
        isFavorite: newFavoriteStatus,
        is_favorite: newFavoriteStatus // Keep both for consistency
      };
      updateStats();
    }
  } catch (error) {
    alert(`Failed to update favorite status: ${error.message || error}`);
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
 * Delete a specific thought directly
 * @param {Object} thought - The thought object
 */
const deleteThought = async (thought) => {
  try {
    if (!isUserSignedIn.value || !userId.value) {
      alert('Please sign in to delete thoughts');
      return;
    }

    // Delete from database via API
    const response = await $fetch(`/api/thoughts/${thought.id}`, {
      method: 'DELETE'
    });
    
    if (!response.success) {
      throw new Error('Failed to delete thought');
    }

    // Remove from local state
    const index = thoughts.value.findIndex((t) => t.id === thought.id);
    if (index !== -1) {
      thoughts.value.splice(index, 1);
      updateStats();
    }
  } catch (error) {
    alert(`Failed to delete thought: ${error.message || error}`);
  }
};

/**
 * Handle both adding and editing thoughts
 * @param {Object} data - The thought form data
 */
const handleThoughtSubmit = async (data) => {
  const isEdit = !!currentThought.value;

  try {
    savingThought.value = true;

    // Wait for auth to load with timeout
    let authCheckAttempts = 0;
    const maxAuthAttempts = 30; // 3 seconds max wait
    
    while (!isLoaded.value && authCheckAttempts < maxAuthAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      authCheckAttempts++;
    }

    if (!isAuthLoaded.value) {
      throw new Error("Authentication failed to load. Please refresh the page.");
    }

    if (!isUserSignedIn.value) {
      throw new Error("Please sign in to save thoughts");
    }

    if (!userId.value) {
      throw new Error("User information not available. Please try signing out and back in.");
    }



    if (isEdit) {
      // Update existing thought via API
      const response = await $fetch(`/api/thoughts/${currentThought.value.id}`, {
        method: 'PUT',
        body: {
          title: data.title,
          content: data.content,
          color: data.color,
          tags: data.tags,
        }
      });

      if (!response.success) {
        throw new Error('Failed to update thought');
      }

      // Update local state
      const index = thoughts.value.findIndex(
        (t) => t.id === currentThought.value.id
      );
      if (index !== -1) {
        thoughts.value[index] = {
          ...response.data,
          isFavorite: response.data.is_favorite // Transform snake_case to camelCase
        };
      }
    } else {
      // Create new thought via API
      const response = await $fetch('/api/thoughts', {
        method: 'POST',
        body: {
          title: data.title,
          content: data.content,
          color: data.color,
          tags: data.tags,
          user_id: userId.value,
          is_favorite: false,
        }
      });

      if (!response.success) {
        throw new Error('Failed to create thought');
      }

      thoughts.value.unshift({
        ...response.data,
        isFavorite: response.data.is_favorite // Transform snake_case to camelCase
      });
    }

    // Update stats
    updateStats();

    // Close modal
    closeModal();
  } catch (error) {
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

/**
 * Handle avatar image loading error
 */
const _onAvatarError = (_event) => {
  // Hide the broken image by setting display to none
  _event.target.style.display = 'none';
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

  // Set a maximum loading timeout as safety net
  const maxLoadingTime = setTimeout(() => {
    if (loadingStats.value || loadingThoughts.value || loadingActions.value) {
      finishLoading();
    }
  }, 10000); // 10 seconds maximum

  loadDashboardData().finally(() => {
    clearTimeout(maxLoadingTime);
  });
});

// Watch for user authentication changes and reload data
watch(
  [isAuthLoaded, isUserSignedIn, userId],
  ([loaded, signedIn, currentUserId]) => {
    if (loaded && signedIn && currentUserId) {
      loadDashboardData();
    }
  },
  { immediate: true }
);
</script>
