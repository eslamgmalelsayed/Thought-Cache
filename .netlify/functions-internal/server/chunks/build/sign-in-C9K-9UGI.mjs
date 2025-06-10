import { u as useHead, a as _sfc_main$b, k as __nuxt_component_1$1, _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$1 } from './AuthFormSkeleton-DzS_GmyL.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import '@clerk/backend/internal';
import '@clerk/shared/deprecated';
import '@clerk/shared/netlifyCacheHandler';
import '@clerk/backend';
import '@clerk/shared/underscore';
import 'node:fs';
import 'node:path';
import 'vue-router';
import '@clerk/shared/loadClerkJsScript';
import '@clerk/vue';
import '@clerk/vue/internal';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './Skeleton-Bh-iScxY.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sign-in",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Sign In - Thought Cache"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      const _component_ClientOnly = __nuxt_component_1$1;
      const _component_AuthFormSkeleton = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div class="text-center"><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "lucide:lightbulb",
        class: "h-12 w-12 text-primary-600"
      }, null, _parent));
      _push(`</div><h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(_ctx.$t("auth.welcome"))}</h2><p class="mt-2 text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(_ctx.$t("app.description"))}</p></div><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AuthFormSkeleton, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AuthFormSkeleton)
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="text-center"><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(_ctx.$t("auth.noAccount") || "Don't have an account?")} `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/sign-up",
        class: "font-medium text-primary-600 hover:text-primary-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("auth.signUp"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("auth.signUp")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sign-in.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sign-in-C9K-9UGI.mjs.map
