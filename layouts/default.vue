<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile menu overlay -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 lg:hidden">
      <div
        class="fixed inset-0 bg-black bg-opacity-25"
        @click="isMobileMenuOpen = false"
      />
      <div
        class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg"
      >
        <AppSidebar @close="isMobileMenuOpen = false" />
      </div>
    </div>

    <!-- Desktop sidebar -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <AppSidebar />
    </div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Top navigation -->
      <AppHeader @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen" />

      <!-- Page content -->
      <main class="py-6">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>

    <!-- Global notifications would go here when properly configured -->
    <!-- <UNotifications /> -->
  </div>
</template>

<script setup>
import { ref } from "vue";

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Close mobile menu on route change
const route = useRoute();
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  }
);
</script>
