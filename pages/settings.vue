<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("nav.settings") || "Settings" }}
      </h1>
    </div>

    <!-- Profile Settings -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Profile Settings
      </h2>

      <form class="space-y-4" @submit.prevent="saveProfile">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- First Name -->
          <div>
            <label
              for="first-name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              First Name
            </label>
            <UInput
              id="first-name"
              v-model="profileSettings.firstName"
              placeholder="Enter your first name"
              autocomplete="given-name"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label
              for="last-name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Last Name
            </label>
            <UInput
              id="last-name"
              v-model="profileSettings.lastName"
              placeholder="Enter your last name"
              autocomplete="family-name"
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <UInput
            id="email"
            v-model="profileSettings.email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
            readonly
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Email is managed through your authentication provider
          </p>
        </div>

        <!-- Bio -->
        <div>
          <label
            for="bio"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Bio
          </label>
          <UTextarea
            id="bio"
            v-model="profileSettings.bio"
            placeholder="Tell us about yourself..."
            :rows="3"
            autocomplete="off"
          />
        </div>

        <div class="flex justify-end">
          <UButton
            type="submit"
            color="primary"
            :loading="profileLoading"
            label="Save Profile"
            icon="lucide:save"
          />
        </div>
      </form>
    </div>

    <!-- Preferences -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Preferences
      </h2>

      <div class="space-y-6">
        <!-- Language -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Language
          </label>
          <USelectMenu
            v-model="preferences.language"
            :options="languageOptions"
            placeholder="Select language"
            value-attribute="code"
            option-attribute="name"
            icon="lucide:globe"
            autocomplete="language"
          />
        </div>

        <!-- Theme -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Theme
          </label>
          <USelectMenu
            v-model="preferences.theme"
            :options="themeOptions"
            placeholder="Select theme"
            value-attribute="value"
            option-attribute="label"
            icon="lucide:palette"
            autocomplete="off"
          />
        </div>

        <!-- Notifications -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
          >
            Notifications
          </label>
          <div class="space-y-3">
            <UCheckbox
              v-model="preferences.emailNotifications"
              label="Email notifications"
              help="Receive notifications via email"
            />
            <UCheckbox
              v-model="preferences.pushNotifications"
              label="Push notifications"
              help="Receive browser push notifications"
            />
            <UCheckbox
              v-model="preferences.weeklyDigest"
              label="Weekly digest"
              help="Get a weekly summary of your thoughts"
            />
          </div>
        </div>

        <!-- Default Category -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Default Category
          </label>
          <USelectMenu
            v-model="preferences.defaultCategory"
            :options="categoryOptions"
            placeholder="Select default category"
            value-attribute="id"
            option-attribute="name"
            icon="lucide:tag"
            autocomplete="off"
          />
        </div>

        <div class="flex justify-end">
          <UButton
            color="primary"
            :loading="preferencesLoading"
            label="Save Preferences"
            icon="lucide:save"
            @click="savePreferences"
          />
        </div>
      </div>
    </div>

    <!-- Data & Privacy -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Data & Privacy
      </h2>

      <div class="space-y-4">
        <!-- Export Data -->
        <div
          class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              Export Your Data
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Download all your thoughts and categories
            </p>
          </div>
          <UButton
            variant="outline"
            color="gray"
            label="Export"
            icon="lucide:download"
            @click="exportData"
          />
        </div>

        <!-- Delete Account -->
        <div
          class="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20"
        >
          <div>
            <h3 class="text-sm font-medium text-red-900 dark:text-red-200">
              Delete Account
            </h3>
            <p class="text-sm text-red-700 dark:text-red-300">
              Permanently delete your account and all data
            </p>
          </div>
          <UButton
            color="red"
            variant="outline"
            label="Delete"
            icon="lucide:trash"
            @click="showDeleteConfirm = true"
          />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteConfirm">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Account
          </h3>
        </template>

        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            This action cannot be undone. This will permanently delete your
            account and all associated data.
          </p>

          <div>
            <label
              for="delete-confirmation"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Type "DELETE" to confirm
            </label>
            <UInput
              id="delete-confirmation"
              v-model="deleteConfirmation"
              placeholder="DELETE"
              autocomplete="off"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton
              variant="ghost"
              color="gray"
              label="Cancel"
              @click="showDeleteConfirm = false"
            />
            <UButton
              color="red"
              :disabled="deleteConfirmation !== 'DELETE'"
              :loading="deleteLoading"
              label="Delete Account"
              @click="deleteAccount"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Settings",
  middleware: "auth",
});

// State
const profileLoading = ref(false);
const preferencesLoading = ref(false);
const deleteLoading = ref(false);
const showDeleteConfirm = ref(false);
const deleteConfirmation = ref("");

// Form data
const profileSettings = ref({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  bio: "",
});

const preferences = ref({
  language: "en",
  theme: "system",
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  defaultCategory: "1",
});

// Options
const languageOptions = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
];

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const categoryOptions = ref([
  { id: "1", name: "Personal" },
  { id: "2", name: "Work" },
  { id: "3", name: "Ideas" },
  { id: "4", name: "Learning" },
]);

// Methods
const saveProfile = async () => {
  try {
    profileLoading.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Profile saved:", profileSettings.value);
    // Show success toast
  } catch (error) {
    console.error("Failed to save profile:", error);
    // Show error toast
  } finally {
    profileLoading.value = false;
  }
};

const savePreferences = async () => {
  try {
    preferencesLoading.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Preferences saved:", preferences.value);
    // Show success toast
  } catch (error) {
    console.error("Failed to save preferences:", error);
    // Show error toast
  } finally {
    preferencesLoading.value = false;
  }
};

const exportData = () => {
  // Simulate data export
  console.log("Exporting data...");
  // In real app, this would trigger a download
};

const deleteAccount = async () => {
  try {
    deleteLoading.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Account deleted");
    // Redirect to sign-out or home page
  } catch (error) {
    console.error("Failed to delete account:", error);
    // Show error toast
  } finally {
    deleteLoading.value = false;
    showDeleteConfirm.value = false;
    deleteConfirmation.value = "";
  }
};

// Watch for delete confirmation modal close
watch(showDeleteConfirm, (isOpen) => {
  if (!isOpen) {
    deleteConfirmation.value = "";
  }
});
</script>
