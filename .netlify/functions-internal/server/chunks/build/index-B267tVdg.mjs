import { _ as _sfc_main$c } from './Skeleton-Bh-iScxY.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, isRef, withCtx, createTextVNode, toDisplayString, mergeModels, useSlots, useModel, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, toRef, toHandlers, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { g as _sfc_main$7$1, a as _sfc_main$b, j as useRuntimeConfig, b as useAppConfig, c as useFormField, d as useButtonGroup, e as useComponentIcons, t as tv, f as _sfc_main$a$1, h as useLocale, r as reactivePick, i as usePortal, l as looseToNumber } from './server.mjs';
import { Primitive, useForwardPropsEmits, DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose } from 'reka-ui';
import { z } from 'zod';
import { useAuth } from '@clerk/vue';
import { createClient } from '@supabase/supabase-js';
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
import '@clerk/vue/internal';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "StatCardSkeleton",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USkeleton = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm" }, _attrs))}><div class="flex items-center animate-pulse"><div class="flex-shrink-0">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-10 w-10 rounded-md" }, null, _parent));
      _push(`</div><div class="ml-5 w-0 flex-1"><div class="space-y-2">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-20" }, null, _parent));
      _push(`<div class="flex items-baseline space-x-2">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-8 w-16" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-12" }, null, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatCardSkeleton.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "StatCard",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    trend: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const iconClasses = computed(() => {
      const baseClasses = "flex items-center justify-center h-10 w-10 rounded-md";
      const colorClasses = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        pink: "bg-pink-500",
        yellow: "bg-yellow-500",
        red: "bg-red-500",
        indigo: "bg-indigo-500"
      };
      return `${baseClasses} ${colorClasses[props.color]}`;
    });
    const trendDirection = computed(() => {
      if (!props.trend) return null;
      return props.trend.startsWith("+") ? "up" : "down";
    });
    const trendIcon = computed(() => {
      return trendDirection.value === "up" ? "lucide:trending-up" : "lucide:trending-down";
    });
    const trendClasses = computed(() => {
      return trendDirection.value === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm" }, _attrs))}><div class="flex items-center"><div class="flex-shrink-0"><div class="${ssrRenderClass(unref(iconClasses))}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: __props.icon,
        class: "h-6 w-6 text-white"
      }, null, _parent));
      _push(`</div></div><div class="mx-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">${ssrInterpolate(__props.title)}</dt><dd class="flex items-baseline"><div class="text-2xl font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.value)}</div>`);
      if (__props.trend) {
        _push(`<div class="${ssrRenderClass([unref(trendClasses), "ml-2 flex items-baseline text-sm font-semibold"])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: unref(trendIcon),
          class: "self-center flex-shrink-0 h-4 w-4",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<span class="sr-only">${ssrInterpolate(unref(trendDirection) === "up" ? "Increased" : "Decreased")} by </span> ${ssrInterpolate(__props.trend)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</dd></dl></div></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatCard.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const theme$3 = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$8 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Input",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: null, required: false, default: "text" },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autocomplete: { type: null, required: false, default: "off" },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  }, {
    "modelValue": { type: null },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:modelValue", "blur", "change"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const [modelValue, modelModifiers] = useModel(__props, "modelValue");
    const appConfig = useAppConfig();
    const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, { deferInputValidation: true });
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const inputSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme$3), ...((_a = appConfig.ui) == null ? void 0 : _a.input) || {} })({
        type: props.type,
        color: color.value,
        variant: props.variant,
        size: inputSize == null ? void 0 : inputSize.value,
        loading: props.loading,
        highlight: highlight.value,
        leading: isLeading.value || !!props.avatar || !!slots.leading,
        trailing: isTrailing.value || !!slots.trailing,
        buttonGroup: orientation.value
      });
    });
    const inputRef = ref(null);
    function updateInput(value) {
      var _a;
      if (modelModifiers.trim) {
        value = (_a = value == null ? void 0 : value.trim()) != null ? _a : null;
      }
      if (modelModifiers.number || props.type === "number") {
        value = looseToNumber(value);
      }
      if (modelModifiers.nullify) {
        value || (value = null);
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      if (!modelModifiers.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (modelModifiers.lazy) {
        updateInput(value);
      }
      if (modelModifiers.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [(_a = props.ui) == null ? void 0 : _a.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<input${ssrRenderAttrs(mergeProps({
              id: unref(id),
              ref_key: "inputRef",
              ref: inputRef,
              type: __props.type,
              value: unref(modelValue),
              name: unref(name),
              placeholder: __props.placeholder,
              class: ui.value.base({ class: (_a2 = props.ui) == null ? void 0 : _a2.base }),
              disabled: unref(disabled),
              required: __props.required,
              autocomplete: __props.autocomplete
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span class="${ssrRenderClass(ui.value.leading({ class: (_b = props.ui) == null ? void 0 : _b.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
                var _a3, _b2, _c2;
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$b, {
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$a$1, mergeProps({
                    size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span class="${ssrRenderClass(ui.value.trailing({ class: (_c = props.ui) == null ? void 0 : _c.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
                var _a3;
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$b, {
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("input", mergeProps({
                id: unref(id),
                ref_key: "inputRef",
                ref: inputRef,
                type: __props.type,
                value: unref(modelValue),
                name: unref(name),
                placeholder: __props.placeholder,
                class: ui.value.base({ class: (_d = props.ui) == null ? void 0 : _d.base }),
                disabled: unref(disabled),
                required: __props.required,
                autocomplete: __props.autocomplete
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete", "onFocus"]),
              renderSlot(_ctx.$slots, "default"),
              unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                class: ui.value.leading({ class: (_e = props.ui) == null ? void 0 : _e.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", {}, () => {
                  var _a3, _b2, _c2;
                  return [
                    unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$b, {
                      key: 0,
                      name: unref(leadingIconName),
                      class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                    }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$a$1, mergeProps({
                      key: 1,
                      size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                    }, __props.avatar, {
                      class: ui.value.leadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.leadingAvatar })
                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                class: ui.value.trailing({ class: (_f = props.ui) == null ? void 0 : _f.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", {}, () => {
                  var _a3;
                  return [
                    unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$b, {
                      key: 0,
                      name: unref(trailingIconName),
                      class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ThoughtCardSkeleton",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USkeleton = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-lg p-4 shadow-sm bg-gray-300 dark:bg-gray-600 animate-pulse" }, _attrs))}><div class="flex items-start justify-between mb-3"><div class="flex-1">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-3/4 bg-white/30" }, null, _parent));
      _push(`</div><div class="flex items-center space-x-1 ml-2">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-6 rounded bg-white/30" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-6 rounded bg-white/30" }, null, _parent));
      _push(`</div></div><div class="mb-4 space-y-2">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-full bg-white/30" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-5/6 bg-white/30" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-4/6 bg-white/30" }, null, _parent));
      _push(`</div><div class="flex items-center justify-between"><div class="flex gap-1">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-12 rounded-full bg-white/30" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-16 rounded-full bg-white/30" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-16 bg-white/30" }, null, _parent));
      _push(`</div><div class="mt-3 flex items-center">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-4 rounded mr-1 bg-white/30" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-20 bg-white/30" }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThoughtCardSkeleton.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ThoughtCard",
  __ssrInlineRender: true,
  props: {
    thought: {
      type: Object,
      required: true
    }
  },
  emits: ["toggle-favorite", "edit", "delete", "archive"],
  setup(__props, { emit: __emit }) {
    const formatDate = (date) => {
      const d = new Date(date);
      const now = /* @__PURE__ */ new Date();
      const diffTime = Math.abs(now.getTime() - d.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays === 1) {
        return "Today";
      } else if (diffDays === 2) {
        return "Yesterday";
      } else if (diffDays <= 7) {
        return `${diffDays - 1} days ago`;
      } else {
        return d.toLocaleDateString();
      }
    };
    const truncateTitle = (title) => {
      const maxLength = 50;
      if (title.length <= maxLength) {
        return title;
      }
      return title.substring(0, maxLength).trim() + "...";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      const _component_UButton = _sfc_main$7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "thought-card rounded-lg p-4 shadow-sm h-full flex flex-col",
        style: { backgroundColor: __props.thought.color }
      }, _attrs))}><div class="flex items-start justify-between mb-3 flex-shrink-0"><div class="flex-1 min-w-0"><h3 class="text-white font-medium text-lg leading-tight mb-2 truncate"${ssrRenderAttr("title", __props.thought.title)}>${ssrInterpolate(truncateTitle(__props.thought.title))}</h3></div><div class="flex items-center space-x-1 ml-2 flex-shrink-0"><button class="${ssrRenderClass([{
        "text-red-500 hover:text-red-600": __props.thought.isFavorite,
        "text-white/70 hover:text-white": !__props.thought.isFavorite
      }, "p-1 rounded transition-colors cursor-pointer"])}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: __props.thought.isFavorite ? "lucide:heart" : "lucide:heart",
        class: [{
          "fill-current": __props.thought.isFavorite
        }, "h-4 w-4"]
      }, null, _parent));
      _push(`</button></div></div><div class="flex-1 overflow-y-auto mb-4 min-h-0"><div class="text-white/90 text-sm leading-relaxed">${ssrInterpolate(__props.thought.content)}</div></div><div class="flex-shrink-0 space-y-3"><div class="flex flex-wrap gap-1"><!--[-->`);
      ssrRenderList(__props.thought.tags.slice(0, 2), (tag) => {
        _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white"> #${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]-->`);
      if (__props.thought.tags.length > 2) {
        _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white"> +${ssrInterpolate(__props.thought.tags.length - 2)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-between w-full space-x-2"><div class="text-white/70 text-xs">${ssrInterpolate(formatDate(__props.thought.createdAt))}</div>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        size: "xs",
        label: _ctx.$t("thoughts.edit") || "Edit",
        icon: "lucide:edit",
        class: "cursor-pointer",
        onClick: ($event) => _ctx.$emit("edit", __props.thought)
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThoughtCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const theme$2 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 overflow-y-auto p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default"
      }
    }
  }
};
const _sfc_main$5 = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    transition: { type: Boolean, required: false, default: true },
    fullscreen: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: String, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      const defaultEvents = {
        closeAutoFocus: (e) => e.preventDefault()
      };
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown", "closeAutoFocus"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return defaultEvents;
    });
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme$2), ...((_a = appConfig.ui) == null ? void 0 : _a.modal) || {} })({
        transition: props.transition,
        fullscreen: props.fullscreen
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DialogTrigger), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  if (__props.overlay) {
                    _push3(ssrRenderComponent(unref(DialogOverlay), {
                      class: ui.value.overlay({ class: (_a = props.ui) == null ? void 0 : _a.overlay })
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(DialogContent), mergeProps({
                    class: ui.value.content({ class: [!slots.default && props.class, (_b = props.ui) == null ? void 0 : _b.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent(unref(DialogTitle), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent(unref(DialogDescription), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                          var _a2, _b2, _c2;
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (__props.close || !!slots.close)) {
                            _push4(`<div class="${ssrRenderClass(ui.value.header({ class: (_a2 = props.ui) == null ? void 0 : _a2.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
                              var _a3, _b3, _c3;
                              _push4(`<div class="${ssrRenderClass(ui.value.wrapper({ class: (_a3 = props.ui) == null ? void 0 : _a3.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DialogTitle), {
                                  class: ui.value.title({ class: (_b3 = props.ui) == null ? void 0 : _b3.title })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DialogDescription), {
                                  class: ui.value.description({ class: (_c3 = props.ui) == null ? void 0 : _c3.description })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              if (__props.close || !!slots.close) {
                                _push4(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        var _a4;
                                        if (__props.close) {
                                          _push5(ssrRenderComponent(_sfc_main$7$1, mergeProps({
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            size: "md",
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof __props.close === "object" ? __props.close : {}, {
                                            class: ui.value.close({ class: (_a4 = props.ui) == null ? void 0 : _a4.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                          var _a4;
                                          return [
                                            __props.close ? (openBlock(), createBlock(_sfc_main$7$1, mergeProps({
                                              key: 0,
                                              icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                              size: "md",
                                              color: "neutral",
                                              variant: "ghost",
                                              "aria-label": unref(t)("modal.close")
                                            }, typeof __props.close === "object" ? __props.close : {}, {
                                              class: ui.value.close({ class: (_a4 = props.ui) == null ? void 0 : _a4.close })
                                            }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                          ];
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.body) {
                            _push4(`<div class="${ssrRenderClass(ui.value.body({ class: (_b2 = props.ui) == null ? void 0 : _b2.body }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "body", {}, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div class="${ssrRenderClass(ui.value.footer({ class: (_c2 = props.ui) == null ? void 0 : _c2.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "content", {}, () => {
                            var _a2, _b2, _c2;
                            return [
                              !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (__props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: ui.value.header({ class: (_a2 = props.ui) == null ? void 0 : _a2.header })
                              }, [
                                renderSlot(_ctx.$slots, "header", {}, () => {
                                  var _a3, _b3, _c3;
                                  return [
                                    createVNode("div", {
                                      class: ui.value.wrapper({ class: (_a3 = props.ui) == null ? void 0 : _a3.wrapper })
                                    }, [
                                      __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                        key: 0,
                                        class: ui.value.title({ class: (_b3 = props.ui) == null ? void 0 : _b3.title })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : createCommentVNode("", true),
                                      __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                        key: 1,
                                        class: ui.value.description({ class: (_c3 = props.ui) == null ? void 0 : _c3.description })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : createCommentVNode("", true)
                                    ], 2),
                                    __props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                      key: 0,
                                      "as-child": ""
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                          var _a4;
                                          return [
                                            __props.close ? (openBlock(), createBlock(_sfc_main$7$1, mergeProps({
                                              key: 0,
                                              icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                              size: "md",
                                              color: "neutral",
                                              variant: "ghost",
                                              "aria-label": unref(t)("modal.close")
                                            }, typeof __props.close === "object" ? __props.close : {}, {
                                              class: ui.value.close({ class: (_a4 = props.ui) == null ? void 0 : _a4.close })
                                            }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                          ];
                                        })
                                      ]),
                                      _: 3
                                    })) : createCommentVNode("", true)
                                  ];
                                })
                              ], 2)) : createCommentVNode("", true),
                              !!slots.body ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: ui.value.body({ class: (_b2 = props.ui) == null ? void 0 : _b2.body })
                              }, [
                                renderSlot(_ctx.$slots, "body")
                              ], 2)) : createCommentVNode("", true),
                              !!slots.footer ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: ui.value.footer({ class: (_c2 = props.ui) == null ? void 0 : _c2.footer })
                              }, [
                                renderSlot(_ctx.$slots, "footer")
                              ], 2)) : createCommentVNode("", true)
                            ];
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      class: ui.value.overlay({ class: (_c = props.ui) == null ? void 0 : _c.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(DialogContent), mergeProps({
                      class: ui.value.content({ class: [!slots.default && props.class, (_d = props.ui) == null ? void 0 : _d.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", {}, () => {
                          var _a2, _b2, _c2;
                          return [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (__props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: ui.value.header({ class: (_a2 = props.ui) == null ? void 0 : _a2.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", {}, () => {
                                var _a3, _b3, _c3;
                                return [
                                  createVNode("div", {
                                    class: ui.value.wrapper({ class: (_a3 = props.ui) == null ? void 0 : _a3.wrapper })
                                  }, [
                                    __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                      key: 0,
                                      class: ui.value.title({ class: (_b3 = props.ui) == null ? void 0 : _b3.title })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ]),
                                      _: 3
                                    }, 8, ["class"])) : createCommentVNode("", true),
                                    __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                      key: 1,
                                      class: ui.value.description({ class: (_c3 = props.ui) == null ? void 0 : _c3.description })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ]),
                                      _: 3
                                    }, 8, ["class"])) : createCommentVNode("", true)
                                  ], 2),
                                  __props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                    key: 0,
                                    "as-child": ""
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        var _a4;
                                        return [
                                          __props.close ? (openBlock(), createBlock(_sfc_main$7$1, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            size: "md",
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof __props.close === "object" ? __props.close : {}, {
                                            class: ui.value.close({ class: (_a4 = props.ui) == null ? void 0 : _a4.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ];
                                      })
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              })
                            ], 2)) : createCommentVNode("", true),
                            !!slots.body ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: ui.value.body({ class: (_b2 = props.ui) == null ? void 0 : _b2.body })
                            }, [
                              renderSlot(_ctx.$slots, "body")
                            ], 2)) : createCommentVNode("", true),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: ui.value.footer({ class: (_c2 = props.ui) == null ? void 0 : _c2.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer")
                            ], 2)) : createCommentVNode("", true)
                          ];
                        })
                      ]),
                      _: 3
                    }, 16, ["class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DialogPortal), unref(portalProps), {
                default: withCtx(() => {
                  var _a, _b;
                  return [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      class: ui.value.overlay({ class: (_a = props.ui) == null ? void 0 : _a.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(DialogContent), mergeProps({
                      class: ui.value.content({ class: [!slots.default && props.class, (_b = props.ui) == null ? void 0 : _b.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", {}, () => {
                          var _a2, _b2, _c;
                          return [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (__props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: ui.value.header({ class: (_a2 = props.ui) == null ? void 0 : _a2.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", {}, () => {
                                var _a3, _b3, _c2;
                                return [
                                  createVNode("div", {
                                    class: ui.value.wrapper({ class: (_a3 = props.ui) == null ? void 0 : _a3.wrapper })
                                  }, [
                                    __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                      key: 0,
                                      class: ui.value.title({ class: (_b3 = props.ui) == null ? void 0 : _b3.title })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ]),
                                      _: 3
                                    }, 8, ["class"])) : createCommentVNode("", true),
                                    __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                      key: 1,
                                      class: ui.value.description({ class: (_c2 = props.ui) == null ? void 0 : _c2.description })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ]),
                                      _: 3
                                    }, 8, ["class"])) : createCommentVNode("", true)
                                  ], 2),
                                  __props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                    key: 0,
                                    "as-child": ""
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        var _a4;
                                        return [
                                          __props.close ? (openBlock(), createBlock(_sfc_main$7$1, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            size: "md",
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof __props.close === "object" ? __props.close : {}, {
                                            class: ui.value.close({ class: (_a4 = props.ui) == null ? void 0 : _a4.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ];
                                      })
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              })
                            ], 2)) : createCommentVNode("", true),
                            !!slots.body ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: ui.value.body({ class: (_b2 = props.ui) == null ? void 0 : _b2.body })
                            }, [
                              renderSlot(_ctx.$slots, "body")
                            ], 2)) : createCommentVNode("", true),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: ui.value.footer({ class: (_c = props.ui) == null ? void 0 : _c.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer")
                            ], 2)) : createCommentVNode("", true)
                          ];
                        })
                      ]),
                      _: 3
                    }, 16, ["class", "onAfterEnter", "onAfterLeave"])
                  ];
                }),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute start-0 flex items-start",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute end-0 flex items-start",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2 inset-y-1",
        "trailing": "pe-2 inset-y-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "autoresize": {
      "true": {
        "base": "resize-none"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$4 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Textarea",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    autoresize: { type: Boolean, required: false },
    autoresizeDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    rows: { type: Number, required: false, default: 3 },
    maxrows: { type: Number, required: false, default: 0 },
    highlight: { type: Boolean, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  }, {
    "modelValue": { type: null },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:modelValue", "blur", "change"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const [modelValue, modelModifiers] = useModel(__props, "modelValue");
    const appConfig = useAppConfig();
    const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props, { deferInputValidation: true });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme$1), ...((_a = appConfig.ui) == null ? void 0 : _a.textarea) || {} })({
        color: color.value,
        variant: props.variant,
        size: size == null ? void 0 : size.value,
        loading: props.loading,
        highlight: highlight.value,
        autoresize: props.autoresize,
        leading: isLeading.value || !!props.avatar || !!slots.leading,
        trailing: isTrailing.value || !!slots.trailing
      });
    });
    const textareaRef = ref(null);
    function updateInput(value) {
      var _a;
      if (modelModifiers.trim) {
        value = (_a = value == null ? void 0 : value.trim()) != null ? _a : null;
      }
      if (modelModifiers.number) {
        value = looseToNumber(value);
      }
      if (modelModifiers.nullify) {
        value || (value = null);
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      autoResize();
      if (!modelModifiers.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (modelModifiers.lazy) {
        updateInput(value);
      }
      if (modelModifiers.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    function autoResize() {
      if (props.autoresize && textareaRef.value) {
        textareaRef.value.rows = props.rows;
        const overflow = textareaRef.value.style.overflow;
        textareaRef.value.style.overflow = "hidden";
        const styles = (void 0).getComputedStyle(textareaRef.value);
        const paddingTop = Number.parseInt(styles.paddingTop);
        const paddingBottom = Number.parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = Number.parseInt(styles.lineHeight);
        const { scrollHeight } = textareaRef.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
        textareaRef.value.style.overflow = overflow;
      }
    }
    watch(modelValue, () => {
      nextTick(autoResize);
    });
    __expose({
      textareaRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      let _temp0;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [(_a = props.ui) == null ? void 0 : _a.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
              id: unref(id),
              ref_key: "textareaRef",
              ref: textareaRef,
              value: unref(modelValue),
              name: unref(name),
              rows: __props.rows,
              placeholder: __props.placeholder,
              class: ui.value.base({ class: (_a2 = props.ui) == null ? void 0 : _a2.base }),
              disabled: unref(disabled),
              required: __props.required
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), "textarea")}${_scopeId}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span class="${ssrRenderClass(ui.value.leading({ class: (_b = props.ui) == null ? void 0 : _b.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
                var _a3, _b2, _c2;
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$b, {
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$a$1, mergeProps({
                    size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span class="${ssrRenderClass(ui.value.trailing({ class: (_c = props.ui) == null ? void 0 : _c.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
                var _a3;
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$b, {
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("textarea", mergeProps({
                id: unref(id),
                ref_key: "textareaRef",
                ref: textareaRef,
                value: unref(modelValue),
                name: unref(name),
                rows: __props.rows,
                placeholder: __props.placeholder,
                class: ui.value.base({ class: (_d = props.ui) == null ? void 0 : _d.base }),
                disabled: unref(disabled),
                required: __props.required
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "value", "name", "rows", "placeholder", "disabled", "required", "onFocus"]),
              renderSlot(_ctx.$slots, "default"),
              unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                class: ui.value.leading({ class: (_e = props.ui) == null ? void 0 : _e.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", {}, () => {
                  var _a3, _b2, _c2;
                  return [
                    unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$b, {
                      key: 0,
                      name: unref(leadingIconName),
                      class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                    }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$a$1, mergeProps({
                      key: 1,
                      size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                    }, __props.avatar, {
                      class: ui.value.leadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.leadingAvatar })
                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                class: ui.value.trailing({ class: (_f = props.ui) == null ? void 0 : _f.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", {}, () => {
                  var _a3;
                  return [
                    unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$b, {
                      key: 0,
                      name: unref(trailingIconName),
                      class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "base": "font-medium inline-flex items-center",
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "xs": {
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-md",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    },
    "square": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "bg-primary text-inverted"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "bg-secondary text-inverted"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "bg-success text-inverted"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "bg-info text-inverted"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "bg-warning text-inverted"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "bg-error text-inverted"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "text-primary ring ring-inset ring-primary/50"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "text-secondary ring ring-inset ring-secondary/50"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "text-success ring ring-inset ring-success/50"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "text-info ring ring-inset ring-info/50"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "text-warning ring ring-inset ring-warning/50"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "text-error ring ring-inset ring-error/50"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "bg-primary/10 text-primary"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "bg-secondary/10 text-secondary"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "bg-success/10 text-success"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "bg-info/10 text-info"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "bg-warning/10 text-warning"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "bg-error/10 text-error"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "bg-success/10 text-success ring ring-inset ring-success/25"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "bg-info/10 text-info ring ring-inset ring-info/25"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "bg-error/10 text-error ring ring-inset ring-error/25"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-0.5"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-1"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$3 = {
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "span" },
    label: { type: [String, Number], required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.badge) || {} })({
        color: props.color,
        variant: props.variant,
        size: buttonGroupSize.value || props.size,
        square: props.square || !slots.default && !props.label,
        buttonGroup: orientation.value
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.base({ class: [(_a = props.ui) == null ? void 0 : _a.base, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
              var _a2, _b, _c;
              if (unref(isLeading) && unref(leadingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$b, {
                  name: unref(leadingIconName),
                  class: ui.value.leadingIcon({ class: (_a2 = props.ui) == null ? void 0 : _a2.leadingIcon })
                }, null, _parent2, _scopeId));
              } else if (!!__props.avatar) {
                _push2(ssrRenderComponent(_sfc_main$a$1, mergeProps({
                  size: ((_b = props.ui) == null ? void 0 : _b.leadingAvatarSize) || ui.value.leadingAvatarSize()
                }, __props.avatar, {
                  class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              var _a2;
              if (__props.label !== void 0 && __props.label !== null) {
                _push2(`<span class="${ssrRenderClass(ui.value.label({ class: (_a2 = props.ui) == null ? void 0 : _a2.label }))}"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
              var _a2;
              if (unref(isTrailing) && unref(trailingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$b, {
                  name: unref(trailingIconName),
                  class: ui.value.trailingIcon({ class: (_a2 = props.ui) == null ? void 0 : _a2.trailingIcon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", {}, () => {
                var _a2, _b, _c;
                return [
                  unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$b, {
                    key: 0,
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: (_a2 = props.ui) == null ? void 0 : _a2.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$a$1, mergeProps({
                    key: 1,
                    size: ((_b = props.ui) == null ? void 0 : _b.leadingAvatarSize) || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ];
              }),
              renderSlot(_ctx.$slots, "default", {}, () => {
                var _a2;
                return [
                  __props.label !== void 0 && __props.label !== null ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: ui.value.label({ class: (_a2 = props.ui) == null ? void 0 : _a2.label })
                  }, toDisplayString(__props.label), 3)) : createCommentVNode("", true)
                ];
              }),
              renderSlot(_ctx.$slots, "trailing", {}, () => {
                var _a2;
                return [
                  unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$b, {
                    key: 0,
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: (_a2 = props.ui) == null ? void 0 : _a2.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ];
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Badge.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const THOUGHT_COLORS = [
  { name: "Orange", value: "#f97316", class: "bg-orange-500" },
  { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
  { name: "Green", value: "#10b981", class: "bg-emerald-500" },
  { name: "Purple", value: "#8b5cf6", class: "bg-violet-500" },
  { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
  { name: "Yellow", value: "#f59e0b", class: "bg-amber-500" },
  { name: "Red", value: "#ef4444", class: "bg-red-500" },
  { name: "Indigo", value: "#6366f1", class: "bg-indigo-500" },
  { name: "Teal", value: "#14b8a6", class: "bg-teal-500" },
  { name: "Cyan", value: "#06b6d4", class: "bg-cyan-500" }
];
const thoughtSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters").trim(),
  content: z.string().min(1, "Content is required").max(5e3, "Content must be less than 5000 characters").trim(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").default([]).refine(
    (tags) => tags.every((tag) => tag.length <= 30),
    "Each tag must be less than 30 characters"
  ).refine(
    (tags) => tags.every((tag) => /^[a-zA-Z0-9\s\u0600-\u06FF-]+$/.test(tag)),
    "Tags can only contain letters, numbers, spaces, and hyphens"
  )
});
const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required").max(30, "Tag name must be less than 30 characters").regex(/^[a-zA-Z0-9\s\u0600-\u06FF-]+$/, "Tag name contains invalid characters").trim()
});
z.object({
  search: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20)
});
thoughtSchema.partial();
function validateData(schema, data) {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        const field = err.path.join(".");
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });
      return {
        success: false,
        errors: fieldErrors
      };
    }
    return { success: false, errors: { general: ["Validation failed"] } };
  }
}
function validateTag(tag) {
  var _a;
  try {
    tagSchema.parse({ name: tag });
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: ((_a = error.errors[0]) == null ? void 0 : _a.message) || "Invalid tag" };
    }
    return { valid: false, error: "Invalid tag" };
  }
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ThoughtForm",
  __ssrInlineRender: true,
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["submit", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formData = ref({
      title: "",
      content: "",
      color: THOUGHT_COLORS[0].value,
      tags: [],
      ...props.initialData
    });
    const errors = ref({});
    const newTag = ref("");
    const tagError = ref("");
    const colorOptions = THOUGHT_COLORS;
    const validateForm = () => {
      const validation = validateData(thoughtSchema, formData.value);
      if (validation.success) {
        errors.value = {};
        return true;
      } else {
        errors.value = validation.errors || {};
        return false;
      }
    };
    const addTag = () => {
      const tag = newTag.value.trim().replace(",", "");
      if (!tag) {
        tagError.value = "";
        return;
      }
      const tagValidation = validateTag(tag);
      if (!tagValidation.valid) {
        tagError.value = tagValidation.error || "Invalid tag";
        return;
      }
      if (formData.value.tags.includes(tag)) {
        tagError.value = "Tag already exists";
        return;
      }
      if (formData.value.tags.length >= 10) {
        tagError.value = "Maximum 10 tags allowed";
        return;
      }
      formData.value.tags.push(tag);
      newTag.value = "";
      tagError.value = "";
      if (errors.value.tags) {
        const newErrors = { ...errors.value };
        delete newErrors.tags;
        errors.value = newErrors;
      }
    };
    const handleTagKeyup = (event) => {
      if (event.key === "," || event.code === "Comma") {
        event.preventDefault();
        addTag();
      }
      if (tagError.value && newTag.value.trim()) {
        tagError.value = "";
      }
    };
    const removeTag = (index) => {
      formData.value.tags.splice(index, 1);
      if (errors.value.tags) {
        const newErrors = { ...errors.value };
        delete newErrors.tags;
        errors.value = newErrors;
      }
    };
    const handleClose = () => {
      emit("close", false);
    };
    const handleSubmit = () => {
      const isValid = validateForm();
      if (isValid) {
        emit("submit", { ...formData.value });
      } else {
        console.log("Form validation failed, not submitting");
      }
    };
    const clearFieldError = (field) => {
      if (errors.value[field]) {
        const newErrors = { ...errors.value };
        newErrors[field] = void 0;
        errors.value = newErrors;
      }
    };
    watch(
      () => props.initialData,
      (newData) => {
        if (newData) {
          Object.assign(formData.value, newData);
          errors.value = {};
        }
      },
      { deep: true }
    );
    watch(
      () => formData.value.title,
      () => clearFieldError("title")
    );
    watch(
      () => formData.value.content,
      () => clearFieldError("content")
    );
    watch(
      () => formData.value.color,
      () => clearFieldError("color")
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$8;
      const _component_UTextarea = _sfc_main$4;
      const _component_UBadge = _sfc_main$3;
      const _component_UIcon = _sfc_main$b;
      const _component_UButton = _sfc_main$7$1;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><label for="thought-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${ssrInterpolate(_ctx.$t("thoughts.form.title") || "Title")} <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        id: "thought-title",
        modelValue: unref(formData).title,
        "onUpdate:modelValue": ($event) => unref(formData).title = $event,
        placeholder: _ctx.$t("thoughts.form.title") || "Enter thought title...",
        error: !!(unref(errors).title && unref(errors).title.length),
        autocomplete: "off",
        required: ""
      }, null, _parent));
      if (unref(errors).title && unref(errors).title.length) {
        _push(`<p class="mt-1 text-sm text-red-600 dark:text-red-400">${ssrInterpolate(unref(errors).title[0])}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="thought-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${ssrInterpolate(_ctx.$t("thoughts.form.content") || "Content")} <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        id: "thought-content",
        modelValue: unref(formData).content,
        "onUpdate:modelValue": ($event) => unref(formData).content = $event,
        placeholder: _ctx.$t("thoughts.form.content") || "Write your thought...",
        rows: 5,
        error: !!(unref(errors).content && unref(errors).content.length),
        autocomplete: "off",
        required: ""
      }, null, _parent));
      if (unref(errors).content && unref(errors).content.length) {
        _push(`<p class="mt-1 text-sm text-red-600 dark:text-red-400">${ssrInterpolate(unref(errors).content[0])}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${ssrInterpolate(_ctx.$t("thoughts.form.color") || "Color")}</label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(colorOptions), (color) => {
        _push(`<button type="button" class="${ssrRenderClass([
          "w-8 h-8 rounded-full border-2 transition-all cursor-pointer",
          unref(formData).color === color.value ? "border-gray-400 ring-2 ring-gray-300" : "border-gray-200 hover:border-gray-300"
        ])}" style="${ssrRenderStyle({ backgroundColor: color.value })}"${ssrRenderAttr("title", color.name)}></button>`);
      });
      _push(`<!--]--></div></div><div><label for="thought-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${ssrInterpolate(_ctx.$t("thoughts.form.tags") || "Tags")}</label><div class="space-y-2">`);
      if (unref(formData).tags.length > 0) {
        _push(`<div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(formData).tags, (tag, index) => {
          _push(ssrRenderComponent(_component_UBadge, {
            key: `tag-${index}`,
            label: tag,
            color: "primary",
            variant: "soft",
            class: "cursor-pointer",
            onClick: ($event) => removeTag(index)
          }, {
            trailing: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "lucide:x",
                  class: "h-3 w-3"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "lucide:x",
                    class: "h-3 w-3"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UInput, {
        id: "thought-tags",
        modelValue: unref(newTag),
        "onUpdate:modelValue": ($event) => isRef(newTag) ? newTag.value = $event : null,
        placeholder: _ctx.$t("tags.placeholder") || "Enter tag name...",
        icon: "lucide:hash",
        error: !!unref(tagError),
        autocomplete: "off",
        onKeyup: [addTag, handleTagKeyup]
      }, null, _parent));
      if (unref(tagError)) {
        _push(`<p class="mt-1 text-sm text-red-600 dark:text-red-400">${ssrInterpolate(unref(tagError))}</p>`);
      } else if (unref(errors).tags && unref(errors).tags.length) {
        _push(`<p class="mt-1 text-sm text-red-600 dark:text-red-400">${ssrInterpolate(unref(errors).tags[0])}</p>`);
      } else {
        _push(`<p class="text-xs text-gray-500 dark:text-gray-400"> Press Enter or comma to add tags (max 10) </p>`);
      }
      _push(`</div></div><div class="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700"><div class="flex gap-2 justify-end">`);
      _push(ssrRenderComponent(_component_UButton, {
        class: "cursor-pointer",
        color: "neutral",
        variant: "ghost",
        label: "Cancel",
        onClick: handleClose
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        label: _ctx.$t("thoughts.form.save") || "Save Thought",
        icon: "lucide:save",
        class: "cursor-pointer",
        loading: __props.loading,
        onClick: handleSubmit
      }, null, _parent));
      _push(`</div></div></form>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThoughtForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ThoughtModal",
  __ssrInlineRender: true,
  props: {
    isOpenModal: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    thoughtData: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "submit", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isOpen = computed({
      get: () => props.isOpenModal,
      set: (value) => emit("update:modelValue", value)
    });
    const handleSubmit = (data) => {
      console.log("ThoughtModal: Form submitted with data:", data);
      emit("submit", data);
    };
    const handleClose = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$5;
      const _component_ThoughtForm = _sfc_main$2;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: unref(isOpen),
        "onUpdate:open": ($event) => isRef(isOpen) ? isOpen.value = $event : null,
        title: props.isEdit ? "Edit Thought" : "Add New Thought",
        dismissible: false,
        class: "p-4"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ThoughtForm, {
              "initial-data": props.thoughtData,
              loading: props.loading,
              onSubmit: handleSubmit,
              onClose: handleClose
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ThoughtForm, {
                "initial-data": props.thoughtData,
                loading: props.loading,
                onSubmit: handleSubmit,
                onClose: handleClose
              }, null, 8, ["initial-data", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThoughtModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useSupabase = () => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  );
  return {
    supabase,
    // Database helpers
    db: {
      // Thoughts operations
      thoughts: {
        getAll: () => supabase.from("thoughts").select("*"),
        getById: (id) => supabase.from("thoughts").select("*").eq("id", id).single(),
        create: (thought) => supabase.from("thoughts").insert(thought).select().single(),
        update: (id, updates) => supabase.from("thoughts").update(updates).eq("id", id).select().single(),
        delete: (id) => supabase.from("thoughts").delete().eq("id", id),
        getByUserId: (userId) => supabase.from("thoughts").select("*").eq("user_id", userId),
        search: (query) => supabase.from("thoughts").select("*").or(`title.ilike.%${query}%, content.ilike.%${query}%`),
        searchByTag: (tag) => supabase.from("thoughts").select("*").contains("tags", [tag]),
        searchByTags: (tags) => supabase.from("thoughts").select("*").overlaps("tags", tags),
        getFavorites: (userId) => supabase.from("thoughts").select("*").eq("user_id", userId).eq("is_favorite", true)
      }
    }
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, isLoaded, isSignedIn } = useAuth();
    const { db } = useSupabase();
    const loadingStats = ref(true);
    const loadingThoughts = ref(true);
    const loadingActions = ref(true);
    const searching = ref(false);
    const loadingMore = ref(false);
    const savingThought = ref(false);
    const showModal = ref(false);
    const currentThought = ref(null);
    const searchQuery = ref("");
    const showFavorites = ref(false);
    const thoughts = ref([]);
    const recentThoughts = ref([]);
    const hasMoreThoughts = ref(true);
    const stats = ref({
      totalThoughts: 0,
      favoriteThoughts: 0,
      monthlyThoughts: 0,
      totalTags: 0,
      thoughtsTrend: "+12%",
      monthlyTrend: "+8%"
    });
    const filteredThoughts = computed(() => {
      let filtered = [...thoughts.value];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (thought) => thought.title.toLowerCase().includes(query) || thought.content.toLowerCase().includes(query) || thought.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      if (showFavorites.value) {
        filtered = filtered.filter((thought) => thought.isFavorite);
      }
      return filtered;
    });
    const loadDashboardData = async () => {
      var _a;
      try {
        if (!isLoaded.value) {
          console.log("Auth still loading, skipping data load");
          return;
        }
        if (!isSignedIn.value || !((_a = user == null ? void 0 : user.value) == null ? void 0 : _a.id)) {
          console.log("User not authenticated, skipping data load");
          return;
        }
        console.log("Loading thoughts from Supabase for user:", user.value.id);
        const { data: userThoughts, error } = await db.thoughts.getByUserId(
          user.value.id
        );
        if (error) {
          throw error;
        }
        thoughts.value = userThoughts || [];
        recentThoughts.value = userThoughts || [];
        console.log("Loaded thoughts:", thoughts.value.length);
        updateStats();
        setTimeout(() => {
          loadingStats.value = false;
        }, 800);
        setTimeout(() => {
          loadingActions.value = false;
        }, 1e3);
        setTimeout(() => {
          loadingThoughts.value = false;
        }, 1200);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        loadingStats.value = false;
        loadingActions.value = false;
        loadingThoughts.value = false;
      }
    };
    const loadMore = async () => {
      loadingMore.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      hasMoreThoughts.value = false;
      loadingMore.value = false;
    };
    const toggleFavorite = (thought) => {
      const index = thoughts.value.findIndex((t) => t.id === thought.id);
      if (index !== -1) {
        thoughts.value[index].isFavorite = !thoughts.value[index].isFavorite;
        stats.value.favoriteThoughts = thoughts.value.filter(
          (t) => t.isFavorite
        ).length;
      }
    };
    const editThought = (thought) => {
      currentThought.value = thought;
      showModal.value = true;
    };
    const openAddModal = () => {
      currentThought.value = null;
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
      currentThought.value = null;
    };
    const deleteThought = (thought) => {
      console.log("Delete thought:", thought.id);
    };
    const handleThoughtSubmit = async (data) => {
      var _a;
      const isEdit = !!currentThought.value;
      console.log(`${isEdit ? "Edit" : "Add"} thought called with:`, data);
      try {
        savingThought.value = true;
        if (!isLoaded.value) {
          throw new Error("Authentication still loading, please wait");
        }
        if (!isSignedIn.value || !((_a = user == null ? void 0 : user.value) == null ? void 0 : _a.id)) {
          throw new Error("User not authenticated");
        }
        console.log("User authenticated:", user.value.id);
        if (isEdit) {
          console.log("Updating thought in Supabase:", data);
          const { data: updatedThought, error } = await db.thoughts.update(
            currentThought.value.id,
            {
              title: data.title,
              content: data.content,
              color: data.color,
              tags: data.tags,
              updated_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          );
          if (error) {
            throw error;
          }
          const index = thoughts.value.findIndex(
            (t) => t.id === currentThought.value.id
          );
          if (index !== -1) {
            thoughts.value[index] = updatedThought;
          }
          console.log("Thought updated successfully!");
        } else {
          console.log("Creating thought in Supabase:", data);
          const { data: newThought, error } = await db.thoughts.create({
            title: data.title,
            content: data.content,
            color: data.color,
            tags: data.tags,
            user_id: user.value.id,
            is_favorite: false
          });
          if (error) {
            throw error;
          }
          console.log("New thought created in Supabase:", newThought);
          thoughts.value.unshift(newThought);
          console.log("Thought created successfully!");
        }
        updateStats();
        closeModal();
      } catch (error) {
        console.error(`Failed to ${isEdit ? "update" : "create"} thought:`, error);
        alert(
          `Failed to ${isEdit ? "update" : "create"} thought: ${error.message}`
        );
      } finally {
        savingThought.value = false;
      }
    };
    const updateStats = () => {
      const allTags = thoughts.value.flatMap((t) => t.tags);
      const uniqueTags = [...new Set(allTags)];
      stats.value.totalThoughts = thoughts.value.length;
      stats.value.favoriteThoughts = thoughts.value.filter(
        (t) => t.isFavorite
      ).length;
      stats.value.totalTags = uniqueTags.length;
    };
    watch(searchQuery, async (newQuery) => {
      if (newQuery) {
        searching.value = true;
        await new Promise((resolve) => setTimeout(resolve, 500));
        searching.value = false;
      }
    });
    watch(
      [isLoaded, isSignedIn, user],
      ([loaded, signedIn, currentUser]) => {
        if (loaded && signedIn && (currentUser == null ? void 0 : currentUser.id)) {
          console.log("User authenticated, loading dashboard data");
          loadDashboardData();
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatCardSkeleton = _sfc_main$a;
      const _component_StatCard = _sfc_main$9;
      const _component_UInput = _sfc_main$8;
      const _component_UButton = _sfc_main$7$1;
      const _component_ThoughtCardSkeleton = _sfc_main$7;
      const _component_UIcon = _sfc_main$b;
      const _component_ThoughtCard = _sfc_main$6;
      const _component_ThoughtModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">`);
      if (unref(loadingStats)) {
        _push(`<!--[-->`);
        ssrRenderList(4, (i) => {
          _push(ssrRenderComponent(_component_StatCardSkeleton, {
            key: `stat-skeleton-${i}`
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_StatCard, {
          title: _ctx.$t("thoughts.title"),
          value: unref(stats).totalThoughts,
          icon: "lucide:lightbulb",
          color: "blue",
          trend: unref(stats).thoughtsTrend
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          title: "Favorites",
          value: unref(stats).favoriteThoughts,
          icon: "lucide:heart",
          color: "red"
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          title: "This Month",
          value: unref(stats).monthlyThoughts,
          icon: "lucide:calendar",
          color: "purple",
          trend: unref(stats).monthlyTrend
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          title: "Tags Used",
          value: unref(stats).totalTags,
          icon: "lucide:hash",
          color: "green"
        }, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div><div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"><div class="flex flex-col sm:flex-row gap-4"><div class="flex-1">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        placeholder: _ctx.$t("thoughts.search") || "Search thoughts...",
        icon: "lucide:search",
        color: "gray",
        variant: "outline",
        loading: unref(searching),
        autocomplete: "search"
      }, null, _parent));
      _push(`</div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: unref(showFavorites) ? "solid" : "outline",
        color: "red",
        icon: "lucide:heart",
        class: "cursor-pointer",
        onClick: ($event) => showFavorites.value = !unref(showFavorites)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(showFavorites) ? "All" : "Favorites")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(showFavorites) ? "All" : "Favorites"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (unref(loadingThoughts)) {
        _push(`<div class="space-y-6"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(12, (i) => {
          _push(ssrRenderComponent(_component_ThoughtCardSkeleton, {
            key: `skeleton-${i}`,
            class: "h-80"
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else if (unref(filteredThoughts).length === 0) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "lucide:lightbulb",
          class: "mx-auto h-12 w-12 text-gray-400"
        }, null, _parent));
        _push(`<h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(searchQuery) ? "No thoughts found" : _ctx.$t("thoughts.empty"))}</h3><p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(searchQuery) ? "Try adjusting your search or filters" : "Start by adding your first brilliant idea!")}</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          class: "mt-4 cursor-pointer",
          icon: "lucide:plus",
          label: _ctx.$t("thoughts.add") || "Add Thought",
          onClick: openAddModal
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">${ssrInterpolate(unref(searchQuery) ? "Search Results" : "Recent Thoughts")}</h2><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(filteredThoughts).length)} ${ssrInterpolate(unref(filteredThoughts).length === 1 ? "thought" : "thoughts")}</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(unref(filteredThoughts), (thought) => {
          _push(ssrRenderComponent(_component_ThoughtCard, {
            key: thought.id,
            thought,
            class: "h-80",
            onToggleFavorite: toggleFavorite,
            onEdit: editThought,
            onDelete: deleteThought
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        if (unref(hasMoreThoughts)) {
          _push(`<div class="text-center">`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "outline",
            color: "gray",
            loading: unref(loadingMore),
            icon: "lucide:chevron-down",
            label: "Load More",
            class: "cursor-pointer",
            onClick: loadMore
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(ssrRenderComponent(_component_ThoughtModal, {
        "is-open-modal": unref(showModal),
        "is-edit": !!unref(currentThought),
        "thought-data": unref(currentThought),
        loading: unref(savingThought),
        onClose: closeModal,
        onSubmit: handleThoughtSubmit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B267tVdg.mjs.map
