<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Top navigation -->
    <AppHeader />

    <!-- Page content -->
    <main class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <!-- Global notifications would go here when properly configured -->
    <!-- <UNotifications /> -->
  </div>
</template>

<script setup></script>
