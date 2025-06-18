import { d as defineEventHandler, a as useRuntimeConfig, b as getRouterParam, c as createError, r as readBody } from '../../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
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

const _id__put = defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    );
    const thoughtId = getRouterParam(event, "id");
    if (!thoughtId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Thought ID is required"
      });
    }
    const body = await readBody(event);
    const updateData = {};
    if (body.title !== void 0) updateData.title = body.title;
    if (body.content !== void 0) updateData.content = body.content;
    if (body.tags !== void 0) updateData.tags = body.tags;
    if (body.color !== void 0) updateData.color = body.color;
    if (body.is_favorite !== void 0) updateData.is_favorite = body.is_favorite;
    const { data: thought, error } = await supabase.from("thoughts").update(updateData).eq("id", thoughtId).select().single();
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to update thought",
        data: error
      });
    }
    return {
      success: true,
      data: thought
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      data: error
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
