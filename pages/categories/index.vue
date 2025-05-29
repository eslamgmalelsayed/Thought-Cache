<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ $t("categories.title") || "Categories" }}
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Organize your thoughts with custom categories
        </p>
      </div>
      <UButton
        :to="'/categories/new'"
        color="primary"
        icon="lucide:plus"
        :label="$t('categories.add') || 'Add Category'"
      />
    </div>

    <!-- Search and filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <UInput
            v-model="searchQuery"
            placeholder="Search categories..."
            icon="lucide:search"
            color="gray"
            variant="outline"
            :loading="searching"
            autocomplete="search"
          />
        </div>
        <div class="flex gap-2">
          <USelectMenu
            v-model="sortBy"
            :options="sortOptions"
            placeholder="Sort by"
            icon="lucide:arrow-up-down"
          />
          <UButton
            icon="lucide:grid"
            variant="outline"
            color="gray"
            :class="{ 'bg-gray-100 dark:bg-gray-700': viewMode === 'grid' }"
            @click="viewMode = 'grid'"
          />
          <UButton
            icon="lucide:list"
            variant="outline"
            color="gray"
            :class="{ 'bg-gray-100 dark:bg-gray-700': viewMode === 'list' }"
            @click="viewMode = 'list'"
          />
        </div>
      </div>
    </div>

    <!-- Quick stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <template v-if="loadingStats">
        <StatCardSkeleton v-for="i in 3" :key="`category-stat-${i}`" />
      </template>
      <template v-else>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div class="flex items-center">
            <UIcon name="lucide:tag" class="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Total Categories
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ totalCategories }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div class="flex items-center">
            <UIcon
              name="lucide:lightbulb"
              class="h-8 w-8 text-green-500 mr-3"
            />
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Thoughts Tagged
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ totalThoughtsTagged }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div class="flex items-center">
            <UIcon name="lucide:star" class="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Most Used</p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ mostUsedCategory }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Loading State -->
    <div v-if="loading">
      <TableSkeleton
        v-if="viewMode === 'list'"
        :row-count="8"
        :include-avatar="true"
        :include-badge="true"
      />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 9"
          :key="`category-skeleton-${i}`"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm animate-pulse"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <USkeleton class="h-10 w-10 rounded-full" />
                <USkeleton class="h-6 w-24" />
              </div>
              <USkeleton class="h-8 w-8 rounded" />
            </div>
            <USkeleton class="h-4 w-full" />
            <div class="flex justify-between items-center">
              <USkeleton class="h-4 w-20" />
              <USkeleton class="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredCategories.length === 0" class="text-center py-12">
      <UIcon name="lucide:tag" class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
        {{ searchQuery ? "No categories found" : "No categories yet" }}
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{
          searchQuery
            ? "Try adjusting your search"
            : "Create your first category to organize your thoughts"
        }}
      </p>
      <UButton
        :to="'/categories/new'"
        color="primary"
        class="mt-4"
        icon="lucide:plus"
        :label="$t('categories.add') || 'Add Category'"
      />
    </div>

    <!-- Categories List View -->
    <div
      v-else-if="viewMode === 'list'"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
    >
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          @click="viewCategory(category)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div
                class="h-10 w-10 rounded-full flex items-center justify-center"
                :style="{ backgroundColor: category.color }"
              >
                <UIcon :name="category.icon" class="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ category.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ category.thoughtsCount }} thoughts
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <UBadge
                :label="category.thoughtsCount.toString()"
                :color="category.thoughtsCount > 0 ? 'green' : 'gray'"
                variant="subtle"
              />
              <UDropdown
                :items="[
                  [
                    {
                      label: 'Edit',
                      icon: 'lucide:edit',
                      click: () => editCategory(category),
                    },
                  ],
                  [
                    {
                      label: 'Delete',
                      icon: 'lucide:trash',
                      click: () => deleteCategory(category),
                    },
                  ],
                ]"
              >
                <UButton
                  icon="lucide:more-horizontal"
                  variant="ghost"
                  color="gray"
                  size="sm"
                />
              </UDropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Grid View -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
        @click="viewCategory(category)"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="h-10 w-10 rounded-full flex items-center justify-center"
                :style="{ backgroundColor: category.color }"
              >
                <UIcon :name="category.icon" class="h-5 w-5 text-white" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ category.name }}
              </h3>
            </div>
            <UDropdown
              :items="[
                [
                  {
                    label: 'Edit',
                    icon: 'lucide:edit',
                    click: () => editCategory(category),
                  },
                ],
                [
                  {
                    label: 'Delete',
                    icon: 'lucide:trash',
                    click: () => deleteCategory(category),
                  },
                ],
              ]"
            >
              <UButton
                icon="lucide:more-horizontal"
                variant="ghost"
                color="gray"
                size="sm"
              />
            </UDropdown>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ category.description || "No description provided" }}
          </p>

          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ category.thoughtsCount }} thoughts
            </span>
            <UBadge
              :label="category.status"
              :color="category.status === 'active' ? 'green' : 'gray'"
              variant="subtle"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Categories",
  middleware: "auth",
});

// Reactive data
const loading = ref(true);
const loadingStats = ref(true);
const searching = ref(false);
const searchQuery = ref("");
const sortBy = ref("name:asc");
const viewMode = ref<"list" | "grid">("grid");

const categories = ref([]);
const totalCategories = ref(0);
const totalThoughtsTagged = ref(0);
const mostUsedCategory = ref("Personal");

// Options
const sortOptions = [
  { value: "name:asc", label: "Name A-Z" },
  { value: "name:desc", label: "Name Z-A" },
  { value: "thoughts:desc", label: "Most Used" },
  { value: "thoughts:asc", label: "Least Used" },
  { value: "created:desc", label: "Newest First" },
  { value: "created:asc", label: "Oldest First" },
];

// Computed
const filteredCategories = computed(() => {
  let filtered = [...categories.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        (category.description &&
          category.description.toLowerCase().includes(query))
    );
  }

  // Apply sorting
  const [field, order] = sortBy.value.split(":");
  filtered.sort((a, b) => {
    let aVal, bVal;

    switch (field) {
      case "name":
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case "thoughts":
        aVal = a.thoughtsCount;
        bVal = b.thoughtsCount;
        break;
      case "created":
        aVal = new Date(a.createdAt);
        bVal = new Date(b.createdAt);
        break;
      default:
        return 0;
    }

    if (order === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  return filtered;
});

// Methods
const loadCategories = async () => {
  try {
    loading.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    categories.value = [
      {
        id: "1",
        name: "Personal",
        description: "Personal thoughts and reflections",
        icon: "lucide:user",
        color: "#3b82f6",
        thoughtsCount: 12,
        status: "active",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        name: "Work",
        description: "Professional ideas and tasks",
        icon: "lucide:briefcase",
        color: "#10b981",
        thoughtsCount: 8,
        status: "active",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "3",
        name: "Ideas",
        description: "Creative and innovative concepts",
        icon: "lucide:lightbulb",
        color: "#f59e0b",
        thoughtsCount: 15,
        status: "active",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: "4",
        name: "Learning",
        description: "Study notes and learning materials",
        icon: "lucide:book-open",
        color: "#8b5cf6",
        thoughtsCount: 6,
        status: "active",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];

    totalCategories.value = categories.value.length;
    totalThoughtsTagged.value = categories.value.reduce(
      (sum, cat) => sum + cat.thoughtsCount,
      0
    );

    // Set most used category
    const maxCategory = categories.value.reduce((max, cat) =>
      cat.thoughtsCount > max.thoughtsCount ? cat : max
    );
    mostUsedCategory.value = maxCategory.name;

    // Staggered loading
    setTimeout(() => {
      loadingStats.value = false;
    }, 800);
  } catch (error) {
    console.error("Failed to load categories:", error);
  } finally {
    loading.value = false;
  }
};

const viewCategory = (category: any) => {
  navigateTo(`/categories/${category.id}`);
};

const editCategory = (category: any) => {
  navigateTo(`/categories/${category.id}/edit`);
};

const deleteCategory = (category: any) => {
  // Delete logic with confirmation
  console.log("Delete category:", category.id);
};

// Watchers
watch(searchQuery, async (newQuery) => {
  if (newQuery) {
    searching.value = true;
    await new Promise((resolve) => setTimeout(resolve, 300));
    searching.value = false;
  }
});

// Load data on mount
onMounted(() => {
  loadCategories();
});
</script>
