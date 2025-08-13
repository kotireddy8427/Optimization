const cacheStore = {};

export function setCache(key, data, ttl = 30000) { // 30 sec default
  cacheStore[key] = { data, expiry: Date.now() + ttl };
}

export function getCache(key) {
  const cached = cacheStore[key];
  if (!cached) return null;
  if (Date.now() > cached.expiry) {
    delete cacheStore[key];
    return null;
  }
  return cached.data;
}

export function invalidateCache(key) {
  delete cacheStore[key];
}
