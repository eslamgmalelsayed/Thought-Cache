import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
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

const dashboard_get = defineEventHandler(async () => {
  try {
    const stats = {
      totalThoughts: 24,
      totalCategories: 6,
      favoriteThoughts: 8,
      monthlyThoughts: 12,
      thoughtsTrend: "+12%",
      monthlyTrend: "+8%"
    };
    return {
      data: stats
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch dashboard statistics"
    });
  }
});

export { dashboard_get as default };
//# sourceMappingURL=dashboard.get.mjs.map
