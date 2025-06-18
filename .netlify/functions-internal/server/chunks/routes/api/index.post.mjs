import { d as defineEventHandler, a as useRuntimeConfig, r as readBody, c as createError } from '../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    );
    const body = await readBody(event);
    if (!body.title || !body.content || !body.user_id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: title, content, user_id"
      });
    }
    const { data: thought, error } = await supabase.from("thoughts").insert([{
      title: body.title,
      content: body.content,
      tags: body.tags || [],
      color: body.color || "#3B82F6",
      is_favorite: body.is_favorite || false,
      user_id: body.user_id
    }]).select().single();
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create thought",
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

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
