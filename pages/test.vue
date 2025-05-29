<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <UIcon
          name="lucide:lightbulb"
          class="h-12 w-12 text-primary-600 mx-auto"
        />
        <h1 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Test Page Working!
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          If you can see this, the basic app is loading correctly.
        </p>
      </div>

      <div class="space-y-4">
        <UButton to="/sign-in" color="primary" label="Go to Sign In" block />
        <UButton to="/" variant="outline" label="Go to Dashboard" block />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Test Page",
  layout: false, // Don't use default layout
  // No middleware - this should load without any auth checks
});

useHead({
  title: "Test - Thought Cache",
});
</script>
