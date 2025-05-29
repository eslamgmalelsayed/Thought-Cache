<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("thoughts.add") || "Add New Thought" }}
      </h1>
      <UButton
        :to="'/thoughts'"
        variant="ghost"
        icon="lucide:arrow-left"
        label="Back to Thoughts"
      />
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <ThoughtForm
        :loading="loading"
        :category-options="categoryOptions"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThoughtFormData } from "@/types";

definePageMeta({
  title: "New Thought",
  middleware: "auth",
});

// State
const loading = ref(false);
const router = useRouter();

// Mock category options - in real app, this would come from an API
const categoryOptions = ref([
  { id: "1", name: "Personal" },
  { id: "2", name: "Work" },
  { id: "3", name: "Ideas" },
  { id: "4", name: "Learning" },
]);

// Methods
const handleSubmit = async (data: ThoughtFormData) => {
  try {
    loading.value = true;

    // Simulate API call
    console.log("Creating thought:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message (you could use a toast notification here)
    console.log("Thought created successfully!");

    // Redirect to thoughts list
    await router.push("/thoughts");
  } catch (error) {
    console.error("Failed to create thought:", error);
    // Handle error (show error message)
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  router.push("/thoughts");
};
</script>
