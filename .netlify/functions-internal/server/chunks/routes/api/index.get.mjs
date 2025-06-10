import { d as defineEventHandler, a as useRuntimeConfig, c as createError } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (_event) => {
  try {
    const config = useRuntimeConfig();
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    );
    const { data: thoughts, error } = await supabase.from("thoughts").select("*");
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch thoughts",
        data: error
      });
    }
    return {
      success: true,
      data: thoughts || [],
      meta: {
        total: (thoughts == null ? void 0 : thoughts.length) || 0
      }
    };
  } catch (error) {
    console.error("Error fetching thoughts:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
