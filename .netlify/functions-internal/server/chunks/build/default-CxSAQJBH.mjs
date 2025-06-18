import { b as useAppConfig, r as reactivePick, c as useFormField, t as tv, a as _sfc_main$b, k as useI18n, g as _sfc_main$7, p as navigateTo, o as useState } from './server.mjs';
import { useSSRContext, defineComponent, mergeModels, useSlots, useModel, useId, computed, unref, mergeProps, withCtx, createBlock, openBlock, Fragment, createCommentVNode, createVNode, renderSlot, createTextVNode, toDisplayString, ref } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { useForwardProps, Primitive, SwitchRoot, SwitchThumb, Label } from 'reka-ui';
import { useAuth } from '@clerk/vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const theme = {
  "slots": {
    "root": "relative flex items-start",
    "base": [
      "inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=unchecked]:bg-accented",
      "transition-[background] duration-200"
    ],
    "container": "flex items-center",
    "thumb": "group pointer-events-none rounded-full bg-default shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center",
    "icon": [
      "absolute shrink-0 group-data-[state=unchecked]:text-dimmed opacity-0 size-10/12",
      "transition-[color,opacity] duration-200"
    ],
    "wrapper": "ms-2",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "data-[state=checked]:bg-primary focus-visible:outline-primary",
        "icon": "group-data-[state=checked]:text-primary"
      },
      "secondary": {
        "base": "data-[state=checked]:bg-secondary focus-visible:outline-secondary",
        "icon": "group-data-[state=checked]:text-secondary"
      },
      "success": {
        "base": "data-[state=checked]:bg-success focus-visible:outline-success",
        "icon": "group-data-[state=checked]:text-success"
      },
      "info": {
        "base": "data-[state=checked]:bg-info focus-visible:outline-info",
        "icon": "group-data-[state=checked]:text-info"
      },
      "warning": {
        "base": "data-[state=checked]:bg-warning focus-visible:outline-warning",
        "icon": "group-data-[state=checked]:text-warning"
      },
      "error": {
        "base": "data-[state=checked]:bg-error focus-visible:outline-error",
        "icon": "group-data-[state=checked]:text-error"
      },
      "neutral": {
        "base": "data-[state=checked]:bg-inverted focus-visible:outline-inverted",
        "icon": "group-data-[state=checked]:text-highlighted"
      }
    },
    "size": {
      "xs": {
        "base": "w-7",
        "container": "h-4",
        "thumb": "size-3 data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "w-8",
        "container": "h-4",
        "thumb": "size-3.5 data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "w-9",
        "container": "h-5",
        "thumb": "size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "w-10",
        "container": "h-5",
        "thumb": "size-4.5 data-[state=checked]:translate-x-4.5 data-[state=checked]:rtl:-translate-x-4.5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "w-11",
        "container": "h-6",
        "thumb": "size-5 data-[state=checked]:translate-x-5 data-[state=checked]:rtl:-translate-x-5",
        "wrapper": "text-base"
      }
    },
    "checked": {
      "true": {
        "icon": "group-data-[state=checked]:opacity-100"
      }
    },
    "unchecked": {
      "true": {
        "icon": "group-data-[state=unchecked]:opacity-100"
      }
    },
    "loading": {
      "true": {
        "icon": "animate-spin"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "base": "cursor-not-allowed opacity-75",
        "label": "cursor-not-allowed opacity-75",
        "description": "cursor-not-allowed opacity-75"
      }
    }
  },
  "defaultVariants": {
    "color": "primary",
    "size": "md"
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Switch",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false },
    checkedIcon: { type: String, required: false },
    uncheckedIcon: { type: String, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    value: { type: String, required: false },
    defaultValue: { type: Boolean, required: false }
  }, {
    "modelValue": { type: Boolean, ...{ default: void 0 } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const slots = useSlots();
    const emits = __emit;
    const modelValue = useModel(__props, "modelValue", { type: Boolean, ...{ default: void 0 } });
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue"));
    const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const id = (_a = _id.value) != null ? _a : useId();
    const ui = computed(() => {
      var _a2;
      return tv({ extend: tv(theme), ...((_a2 = appConfig.ui) == null ? void 0 : _a2.switch) || {} })({
        size: size.value,
        color: color.value,
        required: props.required,
        loading: props.loading,
        disabled: disabled.value || props.loading
      });
    });
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [(_a2 = props.ui) == null ? void 0 : _a2.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a22, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(ui.value.container({ class: (_a22 = props.ui) == null ? void 0 : _a22.container }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(SwitchRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
              name: unref(name),
              disabled: unref(disabled) || __props.loading,
              class: ui.value.base({ class: (_b = props.ui) == null ? void 0 : _b.base })
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a3, _b2;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SwitchThumb), {
                    class: ui.value.thumb({ class: (_a3 = props.ui) == null ? void 0 : _a3.thumb })
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a4, _b3, _c2, _d2, _e2, _f2;
                      if (_push4) {
                        if (__props.loading) {
                          _push4(ssrRenderComponent(_sfc_main$b, {
                            name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                            class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon, checked: true, unchecked: true })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!--[-->`);
                          if (__props.checkedIcon) {
                            _push4(ssrRenderComponent(_sfc_main$b, {
                              name: __props.checkedIcon,
                              class: ui.value.icon({ class: (_b3 = props.ui) == null ? void 0 : _b3.icon, checked: true })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if (__props.uncheckedIcon) {
                            _push4(ssrRenderComponent(_sfc_main$b, {
                              name: __props.uncheckedIcon,
                              class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon, unchecked: true })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--]-->`);
                        }
                      } else {
                        return [
                          __props.loading ? (openBlock(), createBlock(_sfc_main$b, {
                            key: 0,
                            name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                            class: ui.value.icon({ class: (_d2 = props.ui) == null ? void 0 : _d2.icon, checked: true, unchecked: true })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            __props.checkedIcon ? (openBlock(), createBlock(_sfc_main$b, {
                              key: 0,
                              name: __props.checkedIcon,
                              class: ui.value.icon({ class: (_e2 = props.ui) == null ? void 0 : _e2.icon, checked: true })
                            }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                            __props.uncheckedIcon ? (openBlock(), createBlock(_sfc_main$b, {
                              key: 1,
                              name: __props.uncheckedIcon,
                              class: ui.value.icon({ class: (_f2 = props.ui) == null ? void 0 : _f2.icon, unchecked: true })
                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                          ], 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SwitchThumb), {
                      class: ui.value.thumb({ class: (_b2 = props.ui) == null ? void 0 : _b2.thumb })
                    }, {
                      default: withCtx(() => {
                        var _a4, _b3, _c2;
                        return [
                          __props.loading ? (openBlock(), createBlock(_sfc_main$b, {
                            key: 0,
                            name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                            class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon, checked: true, unchecked: true })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            __props.checkedIcon ? (openBlock(), createBlock(_sfc_main$b, {
                              key: 0,
                              name: __props.checkedIcon,
                              class: ui.value.icon({ class: (_b3 = props.ui) == null ? void 0 : _b3.icon, checked: true })
                            }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                            __props.uncheckedIcon ? (openBlock(), createBlock(_sfc_main$b, {
                              key: 1,
                              name: __props.uncheckedIcon,
                              class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon, unchecked: true })
                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                          ], 64))
                        ];
                      }),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.label || !!slots.label || (__props.description || !!slots.description)) {
              _push2(`<div class="${ssrRenderClass(ui.value.wrapper({ class: (_c = props.ui) == null ? void 0 : _c.wrapper }))}"${_scopeId}>`);
              if (__props.label || !!slots.label) {
                _push2(ssrRenderComponent(unref(Label), {
                  for: unref(id),
                  class: ui.value.label({ class: (_d = props.ui) == null ? void 0 : _d.label })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                        _push3(`${ssrInterpolate(__props.label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                          createTextVNode(toDisplayString(__props.label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || !!slots.description) {
                _push2(`<p class="${ssrRenderClass(ui.value.description({ class: (_e = props.ui) == null ? void 0 : _e.description }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                  _push2(`${ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: ui.value.container({ class: (_f = props.ui) == null ? void 0 : _f.container })
              }, [
                createVNode(unref(SwitchRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                  modelValue: modelValue.value,
                  "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
                  name: unref(name),
                  disabled: unref(disabled) || __props.loading,
                  class: ui.value.base({ class: (_g = props.ui) == null ? void 0 : _g.base })
                }), {
                  default: withCtx(() => {
                    var _a3;
                    return [
                      createVNode(unref(SwitchThumb), {
                        class: ui.value.thumb({ class: (_a3 = props.ui) == null ? void 0 : _a3.thumb })
                      }, {
                        default: withCtx(() => {
                          var _a4, _b2, _c2;
                          return [
                            __props.loading ? (openBlock(), createBlock(_sfc_main$b, {
                              key: 0,
                              name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                              class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon, checked: true, unchecked: true })
                            }, null, 8, ["name", "class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              __props.checkedIcon ? (openBlock(), createBlock(_sfc_main$b, {
                                key: 0,
                                name: __props.checkedIcon,
                                class: ui.value.icon({ class: (_b2 = props.ui) == null ? void 0 : _b2.icon, checked: true })
                              }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                              __props.uncheckedIcon ? (openBlock(), createBlock(_sfc_main$b, {
                                key: 1,
                                name: __props.uncheckedIcon,
                                class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon, unchecked: true })
                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                            ], 64))
                          ];
                        }),
                        _: 1
                      }, 8, ["class"])
                    ];
                  }),
                  _: 1
                }, 16, ["id", "modelValue", "onUpdate:modelValue", "name", "disabled", "class"])
              ], 2),
              __props.label || !!slots.label || (__props.description || !!slots.description) ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.wrapper({ class: (_h = props.ui) == null ? void 0 : _h.wrapper })
              }, [
                __props.label || !!slots.label ? (openBlock(), createBlock(unref(Label), {
                  key: 0,
                  for: unref(id),
                  class: ui.value.label({ class: (_i = props.ui) == null ? void 0 : _i.label })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                      createTextVNode(toDisplayString(__props.label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: ui.value.description({ class: (_j = props.ui) == null ? void 0 : _j.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Switch.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, isLoaded, isSignedIn } = useAuth();
    const clerkUser = ref(null);
    ref(false);
    ref(false);
    const showUserMenu = ref(false);
    const avatarUrl = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      const authAvatar = ((_a = user == null ? void 0 : user.value) == null ? void 0 : _a.imageUrl) || ((_b = user == null ? void 0 : user.value) == null ? void 0 : _b.profileImageUrl) || ((_c = user == null ? void 0 : user.value) == null ? void 0 : _c.avatar);
      if (authAvatar) return authAvatar;
      const clerkAvatar = ((_d = clerkUser.value) == null ? void 0 : _d.imageUrl) || ((_e = clerkUser.value) == null ? void 0 : _e.profileImageUrl) || ((_f = clerkUser.value) == null ? void 0 : _f.avatar);
      if (clerkAvatar) return clerkAvatar;
      return null;
    });
    const userDisplayName = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      const authName = ((_a = user == null ? void 0 : user.value) == null ? void 0 : _a.fullName) || ((_b = user == null ? void 0 : user.value) == null ? void 0 : _b.firstName) || ((_c = user == null ? void 0 : user.value) == null ? void 0 : _c.name);
      if (authName) return authName;
      const clerkName = ((_d = clerkUser.value) == null ? void 0 : _d.fullName) || ((_e = clerkUser.value) == null ? void 0 : _e.firstName) || ((_f = clerkUser.value) == null ? void 0 : _f.name);
      if (clerkName) return clerkName;
      return "User";
    });
    const userEmail = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const authEmail = ((_c = (_b = (_a = user == null ? void 0 : user.value) == null ? void 0 : _a.emailAddresses) == null ? void 0 : _b[0]) == null ? void 0 : _c.emailAddress) || ((_e = (_d = user == null ? void 0 : user.value) == null ? void 0 : _d.primaryEmailAddress) == null ? void 0 : _e.emailAddress) || ((_f = user == null ? void 0 : user.value) == null ? void 0 : _f.email);
      if (authEmail) return authEmail;
      const clerkEmail = ((_h = (_g = clerkUser.value) == null ? void 0 : _g.primaryEmailAddress) == null ? void 0 : _h.emailAddress) || ((_k = (_j = (_i = clerkUser.value) == null ? void 0 : _i.emailAddresses) == null ? void 0 : _j[0]) == null ? void 0 : _k.emailAddress) || ((_l = clerkUser.value) == null ? void 0 : _l.email);
      if (clerkEmail) return clerkEmail;
      return null;
    });
    const userInitials = computed(() => {
      var _a, _b, _c, _d;
      let firstName = ((_a = user == null ? void 0 : user.value) == null ? void 0 : _a.firstName) || "";
      let lastName = ((_b = user == null ? void 0 : user.value) == null ? void 0 : _b.lastName) || "";
      if (!firstName && !lastName) {
        firstName = ((_c = clerkUser.value) == null ? void 0 : _c.firstName) || "";
        lastName = ((_d = clerkUser.value) == null ? void 0 : _d.lastName) || "";
      }
      if (firstName && lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
      } else if (firstName) {
        return firstName.charAt(0).toUpperCase();
      } else if (userDisplayName.value && userDisplayName.value !== "User") {
        const names = userDisplayName.value.split(" ");
        if (names.length >= 2) {
          return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
        }
        return names[0].charAt(0).toUpperCase();
      }
      return "U";
    });
    const colorMode = useColorMode();
    const toggleDarkMode = (isDark) => {
      colorMode.preference = isDark ? "dark" : "light";
    };
    const { locale, setLocale, t } = useI18n();
    const toggleLanguage = (isEnglish) => {
      const newLocale = isEnglish ? "en" : "ar";
      setLocale(newLocale);
    };
    const handleSignOut = async () => {
      try {
        if (false) ;
        await navigateTo("/sign-in");
      } catch (error) {
        await navigateTo("/sign-in");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      const _component_USwitch = _sfc_main$2;
      const _component_UButton = _sfc_main$7;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700" }, _attrs))}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex items-center"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "lucide:lightbulb",
        class: "h-8 w-8 text-primary-600"
      }, null, _parent));
      _push(`<h1 class="ml-3 text-xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(_ctx.$t("app.name") || "Thought Cache")}</h1></div></div><div class="flex items-center space-x-4">`);
      if (unref(isLoaded) && unref(isSignedIn)) {
        _push(`<div class="relative"><div class="cursor-pointer">`);
        if (unref(avatarUrl)) {
          _push(`<div class="relative"><img${ssrRenderAttr("src", unref(avatarUrl))}${ssrRenderAttr("alt", unref(userDisplayName))} class="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-primary-500 transition-all duration-200"></div>`);
        } else {
          _push(`<div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-primary-500 transition-all duration-200"><span class="text-white text-sm font-medium">${ssrInterpolate(unref(userInitials))}</span></div>`);
        }
        _push(`</div>`);
        if (unref(showUserMenu)) {
          _push(`<div class="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"><div class="p-4"><div class="pb-3 border-b border-gray-200 dark:border-gray-700"><p class="text-sm font-medium text-gray-900 dark:text-white truncate">${ssrInterpolate(unref(userDisplayName))}</p><p class="text-xs text-gray-500 dark:text-gray-400 truncate">${ssrInterpolate(unref(userEmail))}</p></div><div class="pt-3"><div class="flex items-center justify-between py-2"><div class="flex items-center">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "lucide:moon",
            class: "h-4 w-4 text-gray-500 mr-2"
          }, null, _parent));
          _push(`<span class="text-sm text-gray-700 dark:text-gray-300"> Dark Mode </span></div>`);
          _push(ssrRenderComponent(_component_USwitch, {
            "unchecked-icon": "i-lucide-sun",
            "checked-icon": "i-lucide-moon",
            "model-value": unref(colorMode).value === "dark",
            "onUpdate:modelValue": toggleDarkMode
          }, null, _parent));
          _push(`</div><div class="flex items-center justify-between py-2"><div class="flex items-center">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "lucide:globe",
            class: "h-4 w-4 text-gray-500 mr-2"
          }, null, _parent));
          _push(`<span class="text-sm text-gray-700 dark:text-gray-300"> English </span></div>`);
          _push(ssrRenderComponent(_component_USwitch, {
            "unchecked-icon": "i-lucide-x",
            "checked-icon": "i-lucide-check",
            "model-value": unref(locale) === "en",
            "onUpdate:modelValue": toggleLanguage
          }, null, _parent));
          _push(`</div><hr class="my-2 border-gray-200 dark:border-gray-700">`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            color: "red",
            icon: "lucide:log-out",
            class: "w-full justify-start cursor-pointer",
            onClick: handleSignOut
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("auth.signOut") || "Sign Out")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("auth.signOut") || "Sign Out"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (unref(isLoaded) && !unref(isSignedIn)) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "solid",
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/sign-in")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign In `);
            } else {
              return [
                createTextVNode(" Sign In ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>`);
      }
      _push(`</div></div></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<main class="py-6"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></main></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CxSAQJBH.mjs.map
