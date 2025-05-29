<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("categories.add") || "Add New Category" }}
      </h1>
      <UButton
        :to="'/categories'"
        variant="ghost"
        icon="lucide:arrow-left"
        label="Back to Categories"
      />
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <CategoryForm
        :loading="loading"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "New Category",
  middleware: "auth",
});

// State
const loading = ref(false);
const router = useRouter();

// Methods
const handleSubmit = async (data: {
  name: string;
  description?: string;
  icon?: string;
  color: string;
}) => {
  try {
    loading.value = true;

    // Simulate API call
    console.log("Creating category:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message (you could use a toast notification here)
    console.log("Category created successfully!");

    // Redirect to categories list
    await router.push("/categories");
  } catch (error) {
    console.error("Failed to create category:", error);
    // Handle error (show error message)
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  router.push("/categories");
};
</script>
