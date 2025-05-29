<template>
  <div class="w-full max-w-md mx-auto animate-pulse">
    <!-- Header skeleton -->
    <div class="text-center mb-8">
      <USkeleton class="h-8 w-32 mx-auto mb-2" />
      <USkeleton class="h-4 w-48 mx-auto" />
    </div>

    <!-- Auth form skeleton -->
    <div class="space-y-4">
      <!-- Email field -->
      <div class="space-y-2">
        <USkeleton class="h-4 w-20" />
        <USkeleton class="h-10 w-full rounded-md" />
      </div>

      <!-- Password field -->
      <div class="space-y-2">
        <USkeleton class="h-4 w-24" />
        <USkeleton class="h-10 w-full rounded-md" />
      </div>

      <!-- Additional field for sign-up -->
      <div v-if="isSignUp" class="space-y-2">
        <USkeleton class="h-4 w-28" />
        <USkeleton class="h-10 w-full rounded-md" />
      </div>

      <!-- Submit button -->
      <USkeleton class="h-10 w-full rounded-md mt-6" />

      <!-- Divider -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <USkeleton class="h-px w-full" />
        </div>
        <div class="relative flex justify-center">
          <USkeleton class="h-4 w-8 bg-white dark:bg-gray-800" />
        </div>
      </div>

      <!-- Social buttons -->
      <div class="space-y-3">
        <USkeleton class="h-10 w-full rounded-md" />
        <USkeleton class="h-10 w-full rounded-md" />
      </div>

      <!-- Terms/Links -->
      <div class="text-center mt-6">
        <USkeleton class="h-4 w-64 mx-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isSignUp?: boolean;
}

withDefaults(defineProps<Props>(), {
  isSignUp: false,
});
</script>
