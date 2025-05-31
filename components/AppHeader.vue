<template>
  <header
    class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <!-- Left section -->
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <UButton
            icon="lucide:menu"
            variant="ghost"
            color="neutral"
            class="lg:hidden"
            @click="$emit('toggle-mobile-menu')"
          />

          <!-- Breadcrumbs -->
          <nav class="hidden lg:flex items-center ml-4">
            <UBreadcrumb :items="breadcrumbItems" />
          </nav>
        </div>

        <!-- Center section - Search -->
        <div
          class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
        >
          <div class="w-full max-w-lg lg:max-w-xs">
            <UInput
              v-model="searchQuery"
              :placeholder="$t('thoughts.search')"
              icon="lucide:search"
              color="neutral"
              variant="outline"
              class="w-full"
              autocomplete="search"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>

        <!-- Right section -->
        <div class="flex items-center space-x-4">
          <!-- Quick actions -->
          <UButton
            :to="'/thoughts/new'"
            icon="lucide:plus"
            color="primary"
            variant="solid"
            :label="$t('thoughts.add')"
            class="hidden sm:flex"
          />

          <!-- Mobile add button -->
          <UButton
            :to="'/thoughts/new'"
            icon="lucide:plus"
            color="primary"
            variant="solid"
            class="sm:hidden"
          />

          <!-- Notifications -->
          <UButton
            icon="lucide:bell"
            variant="ghost"
            color="neutral"
            class="relative"
          >
            <template v-if="notificationCount > 0">
              <UBadge
                :label="notificationCount.toString()"
                color="error"
                variant="solid"
                class="absolute -top-1 -right-1"
              />
            </template>
          </UButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

// Emits
// const emit = defineEmits(["toggle-mobile-menu"]);

// Search functionality
const searchQuery = ref("");
const router = useRouter();
const route = useRoute();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/thoughts",
      query: { search: searchQuery.value.trim() },
    });
  }
};

// Breadcrumbs
const breadcrumbItems = computed((): BreadcrumbItem[] => {
  const pathSegments = route.path.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [
    {
      label: "Dashboard",
      to: "/",
      icon: "i-lucide-home",
    },
  ];

  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Convert segment to readable label
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    // Get appropriate icon for different sections
    let icon = "i-lucide-folder";
    if (segment === "thoughts") {
      icon = "i-lucide-lightbulb";
    } else if (segment === "categories") {
      icon = "i-lucide-tag";
    } else if (segment === "profile") {
      icon = "i-lucide-user";
    } else if (segment === "settings") {
      icon = "i-lucide-settings";
    }

    const item: BreadcrumbItem = {
      label,
      icon,
    };

    // Only add 'to' property if not the last item
    if (index < pathSegments.length - 1) {
      item.to = currentPath;
    }

    items.push(item);
  });

  return items;
});

// Notifications (placeholder)
const notificationCount = ref(0);

// Initialize search from query params
onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search as string;
  }
});
</script>
