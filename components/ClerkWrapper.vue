<template>
  <div class="clerk-wrapper">
    <!-- Loading State -->
    <div v-if="showSkeleton" class="clerk-loading">
      <slot name="skeleton">
        <AuthFormSkeleton :is-sign-up="isSignUp" />
      </slot>
    </div>

    <!-- Clerk Component -->
    <div v-else class="clerk-component">
      <slot />
    </div>

    <!-- Error State -->
    <div v-if="hasError" class="clerk-error mt-4">
      <div
        class="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
      >
        <UIcon
          name="lucide:alert-circle"
          class="h-8 w-8 text-red-500 mx-auto mb-2"
        />
        <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
          Authentication Service Unavailable
        </h3>
        <p class="text-sm text-red-600 dark:text-red-300 mt-1">
          Please refresh the page or try again in a moment.
        </p>
        <UButton
          variant="outline"
          color="red"
          size="sm"
          class="mt-3"
          label="Retry"
          @click="retry"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps({
    isSignUp: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  }),
  {}
);

// Loading state management
const isLoading = ref(true);
const hasError = ref(false);
const loadingTimeout = ref();

const showSkeleton = computed(() => isLoading.value && !hasError.value);

const stopLoading = () => {
  isLoading.value = false;
  if (loadingTimeout.value) {
    clearTimeout(loadingTimeout.value);
  }
};

const setError = () => {
  hasError.value = true;
  stopLoading();
};

const retry = () => {
  isLoading.value = true;
  hasError.value = false;
  if (import.meta.client) {
    window.location.reload();
  }
};

// Initialize loading timeout
onMounted(() => {
  loadingTimeout.value = setTimeout(() => {
    if (isLoading.value) {
      setError();
    }
  }, props.timeout);

  // Check for Clerk readiness
  if (import.meta.client) {
    let attempts = 0;
    const maxAttempts = Math.floor(props.timeout / 100); // Based on timeout
    
    const checkClerk = () => {
      attempts++;
      
      try {
        const clerk = window?.Clerk;
        if (clerk?.loaded) {
          stopLoading();
          return;
        }
        
        if (attempts >= maxAttempts) {
          setError();
          return;
        }
        
        setTimeout(checkClerk, 100);
      } catch {
        if (attempts >= maxAttempts) {
          setError();
          return;
        }
        setTimeout(checkClerk, 100);
      }
    };
    checkClerk();
  } else {
    // Server-side, just use timeout
    setTimeout(() => {
      if (isLoading.value) {
        stopLoading();
      }
    }, 1000);
  }
});

onUnmounted(() => {
  if (loadingTimeout.value) {
    clearTimeout(loadingTimeout.value);
  }
});
</script>

<style scoped>
.clerk-loading {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
