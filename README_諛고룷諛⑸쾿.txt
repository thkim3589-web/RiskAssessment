[PWA 배포 및 PWABuilder APK 변환 가이드]  (수정본 - 아이콘 경로 문제 해결)

■ 수정 내용
GitHub 저장소를 확인해보니 아이콘 파일들이 icons/ 하위 폴더가 아닌
저장소 루트에 그대로 올라가 있었습니다. 그런데 manifest.json은
"icons/icon-192x192.png" 처럼 하위 폴더를 참조하고 있어서
아이콘을 찾지 못했고, 그로 인해 PWABuilder가 manifest 자체를
"유효하지 않다"고 판단해 자동으로 새 manifest를 만들어버린 것이
문제의 원인이었습니다.

→ manifest.json, index.html, sw.js 세 파일 모두 아이콘 경로를
  "icons/xxx.png" → "xxx.png" (루트 경로)로 수정했습니다.

■ 폴더 구성 (모두 같은 위치, 하위 폴더 없음)
- index.html
- manifest.json
- sw.js
- icon-192x192.png
- icon-512x512.png
- icon-192x192-maskable.png
- icon-512x512-maskable.png
- apple-touch-icon.png
- favicon.ico

■ 적용 방법
1) GitHub 저장소(thkim3589-web)에 있는 기존
   manifest.json, index.html, sw.js 3개 파일을
   여기 첨부된 새 파일로 덮어쓰기(교체 업로드) 하세요.
   - 저장소에 이미 있던 icon-192x192.png, icon-512x512.png는
     그대로 두시면 되고, icon-192x192-maskable.png,
     icon-512x512-maskable.png, apple-touch-icon.png, favicon.ico는
     저장소에 없다면 함께 업로드해주세요.
2) GitHub Pages가 켜져 있는지 확인 (Settings → Pages →
   "Your site is live at ~" 문구 확인)
3) 배포 URL 예: https://thkim3589-web.github.io/저장소이름/
4) 1~2분 정도 기다렸다가 (GitHub Pages 반영 시간) PWABuilder에
   동일한 URL을 다시 입력해 재검사

■ 확인 팁
브라우저에서 https://내주소/manifest.json 을 직접 열어서
JSON 내용이 그대로 보이는지, 그리고
https://내주소/icon-192x192.png 를 열어서 아이콘 이미지가
바로 보이는지 확인하면 문제 해결 여부를 바로 알 수 있습니다.

■ 참고 (보안)
index.html 안에 카카오 API 키, 기상청 API 키가 코드에 그대로 노출되어
있습니다. 개인 사용 시에는 무방하지만, 앱을 여러 사람과 공유/배포할
계획이라면 키 도용을 막기 위해 서버(프록시) 경유 방식으로 바꾸는 것을
권장드립니다. 지금 당장 APK 변환 자체에는 문제되지 않습니다.
