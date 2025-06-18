import { d as defineEventHandler, a as useRuntimeConfig, b as getRouterParam, c as createError } from '../../../_/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
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
    const { error } = await supabase.from("thoughts").delete().eq("id", thoughtId);
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to delete thought: ${error.message}`,
        data: error
      });
    }
    return {
      success: true,
      message: "Thought deleted successfully"
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

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
