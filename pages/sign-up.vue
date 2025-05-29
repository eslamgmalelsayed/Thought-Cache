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
          {{ $t("auth.createAccount") || "Create your account" }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ $t("app.description") }}
        </p>
      </div>

      <!-- Clerk Sign Up Component with Loading Skeleton -->
      <div class="flex justify-center">
        <ClientOnly>
          <SignUp :fallback-redirect-url="'/'" :sign-in-url="'/sign-in'" />
          <template #fallback>
            <AuthFormSkeleton :is-sign-up="true" />
          </template>
        </ClientOnly>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ $t("auth.hasAccount") || "Already have an account?" }}
          <NuxtLink
            to="/sign-in"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            {{ $t("auth.signIn") }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: "Sign Up",
  middleware: "guest",
  layout: false, // Don't use default layout for auth pages
});

// Set page title
useHead({
  title: "Sign Up - Thought Cache",
});
</script>
