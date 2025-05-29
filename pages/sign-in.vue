<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center">
          <UIcon name="lucide:lightbulb" class="h-12 w-12 text-primary-600" />
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t("auth.welcome") }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ $t("app.description") }}
        </p>
      </div>

      <!-- Clerk Sign In Component with Loading Skeleton -->
      <div class="flex justify-center">
        <ClientOnly>
          <SignIn :fallback-redirect-url="'/'" :sign-up-url="'/sign-up'" />
          <template #fallback>
            <AuthFormSkeleton />
          </template>
        </ClientOnly>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ $t("auth.noAccount") || "Don't have an account?" }}
          <NuxtLink
            to="/sign-up"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            {{ $t("auth.signUp") }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: "Sign In",
  middleware: "guest",
  layout: false, // Don't use default layout for auth pages
});

// Set page title
useHead({
  title: "Sign In - Thought Cache",
});
</script>
