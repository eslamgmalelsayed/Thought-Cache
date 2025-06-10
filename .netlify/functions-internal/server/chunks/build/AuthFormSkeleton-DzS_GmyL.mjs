import { _ as _sfc_main$1 } from './Skeleton-Bh-iScxY.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthFormSkeleton",
  __ssrInlineRender: true,
  props: {
    isSignUp: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USkeleton = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-md mx-auto animate-pulse" }, _attrs))}><div class="text-center mb-8">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-8 w-32 mx-auto mb-2" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-48 mx-auto" }, null, _parent));
      _push(`</div><div class="space-y-4"><div class="space-y-2">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-20" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-10 w-full rounded-md" }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-24" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-10 w-full rounded-md" }, null, _parent));
      _push(`</div>`);
      if (_ctx.isSignUp) {
        _push(`<div class="space-y-2">`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-28" }, null, _parent));
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-10 w-full rounded-md" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-10 w-full rounded-md mt-6" }, null, _parent));
      _push(`<div class="relative my-6"><div class="absolute inset-0 flex items-center">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-px w-full" }, null, _parent));
      _push(`</div><div class="relative flex justify-center">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-8 bg-white dark:bg-gray-800" }, null, _parent));
      _push(`</div></div><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-10 w-full rounded-md" }, null, _parent));
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-10 w-full rounded-md" }, null, _parent));
      _push(`</div><div class="text-center mt-6">`);
      _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-64 mx-auto" }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthFormSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AuthFormSkeleton-DzS_GmyL.mjs.map
