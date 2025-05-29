<template>
  <div class="space-y-6">
    <!-- Welcome header -->
    <div
      class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white"
    >
      <h1 class="text-2xl font-bold">
        {{ $t("auth.welcome") }}
      </h1>
      <p class="mt-2 text-primary-100">
        {{ $t("app.description") }}
      </p>
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

    <!-- Quick actions -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <template v-if="loadingActions">
          <QuickActionCardSkeleton
            v-for="i in 3"
            :key="`action-skeleton-${i}`"
          />
        </template>
        <template v-else>
          <QuickActionCard
            :title="$t('thoughts.add')"
            description="Capture a new brilliant idea"
            icon="lucide:plus"
            color="primary"
            to="/thoughts/new"
          />
          <QuickActionCard
            :title="$t('categories.add')"
            description="Organize your thoughts better"
            icon="lucide:folder-plus"
            color="green"
            to="/categories/new"
          />
          <QuickActionCard
            title="Browse All"
            description="View all your thoughts"
            icon="lucide:layout-grid"
            color="blue"
            to="/thoughts"
          />
        </template>
      </div>
    </div>

    <!-- Recent thoughts -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Thoughts
        </h2>
        <UButton
          v-if="!loadingThoughts"
          :to="'/thoughts'"
          variant="ghost"
          color="primary"
          :label="'View All'"
          trailing-icon="lucide:arrow-right"
        />
        <USkeleton v-else class="h-8 w-20" />
      </div>

      <div v-if="loadingThoughts" class="space-y-4">
        <div
          class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          <ThoughtCardSkeleton
            v-for="i in 6"
            :key="`thought-skeleton-${i}`"
            class="break-inside-avoid mb-4"
          />
        </div>
      </div>

      <div v-else-if="recentThoughts.length === 0" class="text-center py-8">
        <UIcon
          name="lucide:lightbulb"
          class="mx-auto h-12 w-12 text-gray-400"
        />
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          {{ $t("thoughts.empty") }}
        </h3>
        <UButton
          :to="'/thoughts/new'"
          color="primary"
          class="mt-4"
          :label="$t('thoughts.add')"
        />
      </div>

      <div
        v-else
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <ThoughtCard
          v-for="thought in recentThoughts"
          :key="thought.id"
          :thought="thought"
          class="break-inside-avoid mb-4"
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

const recentThoughts = ref([]);
const stats = ref({
  totalThoughts: 0,
  totalCategories: 0,
  favoriteThoughts: 0,
  monthlyThoughts: 0,
  thoughtsTrend: "+12%",
  monthlyTrend: "+8%",
});

// Load dashboard data
const loadDashboardData = async () => {
  try {
    // Fetch recent thoughts and stats with realistic loading simulation
    const [thoughtsResponse, statsResponse] = await Promise.all([
      $fetch("/api/thoughts?limit=6&sort=createdAt:desc"),
      $fetch("/api/stats/dashboard"),
    ]);

    recentThoughts.value = thoughtsResponse.data || [];
    stats.value = { ...stats.value, ...statsResponse.data };

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

// Load data on mount
onMounted(() => {
  loadDashboardData();
});
</script>
