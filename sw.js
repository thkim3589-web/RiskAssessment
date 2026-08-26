// 위험성 평가표 앱 - 기본 서비스 워커
// 앱 셸(HTML)을 캐싱해 오프라인에서도 최소한 열리도록 하고,
// PWA 설치 가능(installability) 요건을 충족시킵니다.

const CACHE_NAME = "risk-assessment-cache-v1";
const APP_SHELL = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 네트워크 우선, 실패 시 캐시 (날씨/GPS API는 항상 최신 데이터가 필요하므로
// 외부 API 요청은 캐싱하지 않고 그대로 통과시킵니다)
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 같은 출처(origin)의 요청만 캐시 대상으로 처리
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
