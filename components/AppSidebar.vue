<template>
  <div class="flex h-full flex-col bg-white dark:bg-gray-800 shadow-lg">
    <!-- Logo and close button -->
    <div class="flex h-16 flex-shrink-0 items-center px-4">
      <div class="flex items-center">
        <UIcon name="lucide:lightbulb" class="h-8 w-8 text-primary-600" />
        <h1 class="ml-3 text-xl font-bold text-gray-900 dark:text-white">
          {{ $t("app.name") }}
        </h1>
      </div>
      <UButton
        v-if="props.close"
        icon="lucide:x"
        variant="ghost"
        color="gray"
        class="ml-auto lg:hidden"
        @click="emit('close')"
      />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 px-2 py-4">
      <NuxtLink
        v-for="item in navigation"
        :key="item.href"
        :to="item.href"
        class="group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors"
        active-class="bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100"
        inactive-class="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      >
        <UIcon :name="item.icon" class="mr-3 h-5 w-5 flex-shrink-0" />
        {{ $t(item.name) }}
        <span
          v-if="item.badge"
          class="ml-auto inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-600 text-white"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>
    </nav>

    <!-- User section -->
    <div class="flex-shrink-0">
      <!-- Theme and Language Controls -->
      <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-4">
        <!-- Theme Toggle -->
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ $t("ui.theme.system") }}
          </span>
          <ClientOnly>
            <UButton
              :icon="themeIcon"
              variant="ghost"
              color="gray"
              @click="toggleTheme"
            />
          </ClientOnly>
        </div>

        <!-- Language Toggle -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ $t("nav.language") || "Language" }}
          </span>
          <UButton
            :label="currentLanguage.flag"
            variant="ghost"
            color="gray"
            @click="toggleLanguage"
          />
        </div>
      </div>

      <!-- User Profile -->
      <div
        v-if="user"
        class="border-t border-gray-200 dark:border-gray-700 px-4 py-4"
      >
        <div class="flex items-center mb-3">
          <div
            v-if="user?.imageUrl"
            class="h-8 w-8 rounded-full overflow-hidden"
          >
            <img
              :src="user.imageUrl"
              :alt="user.fullName || user.firstName || 'User'"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            v-else
            class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center"
          >
            <UIcon name="lucide:user" class="h-4 w-4 text-white" />
          </div>
          <div class="ml-3 flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate"
            >
              {{ user?.fullName || user?.firstName || "User" }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              {{
                user?.emailAddresses?.[0]?.emailAddress || "user@example.com"
              }}
            </p>
          </div>
        </div>

        <!-- Sign out button -->
        <UButton
          icon="lucide:log-out"
          variant="ghost"
          color="red"
          :label="$t('auth.signOut') || 'Sign Out'"
          class="w-full justify-start"
          size="sm"
          @click="handleSignOut"
        />
      </div>

      <!-- User Profile Loading Skeleton -->
      <UserProfileSkeleton v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAV_ITEMS, LANGUAGE_OPTIONS } from "@/utils/constants";

// Props
const props = defineProps({
  close: {
    type: Function,
    required: false,
  },
});

// Emits
const emit = defineEmits(["close"]);

// Clerk authentication
const { user, signOut } = useAuth();

// Navigation items
const navigation = NAV_ITEMS;

// Theme management
const colorMode = useColorMode();
const themeIcon = computed(() => {
  switch (colorMode.value) {
    case "light":
      return "lucide:sun";
    case "dark":
      return "lucide:moon";
    default:
      return "lucide:monitor";
  }
});

const toggleTheme = () => {
  const themes = ["light", "dark", "system"];
  const currentIndex = themes.indexOf(colorMode.preference);
  const nextIndex = (currentIndex + 1) % themes.length;
  colorMode.preference = themes[nextIndex];
};

// Language management
const { locale, setLocale } = useI18n();
const currentLanguage = computed(
  () =>
    LANGUAGE_OPTIONS.find((lang) => lang.value === locale.value) ||
    LANGUAGE_OPTIONS[0]
);

const toggleLanguage = () => {
  const newLocale = locale.value === "en" ? "ar" : "en";
  setLocale(newLocale);
};

// Sign out handler
const handleSignOut = async () => {
  try {
    await signOut();
    await navigateTo("/sign-in");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};
</script>
