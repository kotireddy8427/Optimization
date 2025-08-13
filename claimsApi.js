import { getCache, setCache } from "../utils/cache";

let requestCount = 0;
let totalResponseTime = 0;

const generateClaims = (total = 1000) =>
  Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    claimant: `User ${i + 1}`,
    amount: Math.floor(Math.random() * 1000),
    status: ["Pending", "Approved", "Rejected"][i % 3],
  }));

const allClaims = generateClaims();

export async function fetchClaims(page = 1, pageSize = 20) {
  const cacheKey = `claims_${page}_${pageSize}`;
  const cached = getCache(cacheKey);
  if (cached) return { data: cached, fromCache: true };

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const t0 = performance.now();
  const data = allClaims.slice(start, end);
  await new Promise((r) => setTimeout(r, 300)); // simulate network delay
  const t1 = performance.now();

  totalResponseTime += t1 - t0;
  requestCount++;

  setCache(cacheKey, data, 60000); // cache for 60 sec
  return { data, fromCache: false };
}

export function getPerformanceMetrics() {
  const avgResponseTime = requestCount ? totalResponseTime / requestCount : 0;
  return { requestCount, avgResponseTime: avgResponseTime.toFixed(2) };
}
