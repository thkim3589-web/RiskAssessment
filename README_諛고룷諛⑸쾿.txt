[PWA 배포 및 PWABuilder APK 변환 가이드]

■ 폴더 구성
- index.html          → 메인 앱 (manifest/아이콘/서비스워커 연결 완료)
- manifest.json       → PWA 매니페스트
- sw.js               → 서비스 워커 (오프라인 캐싱 + 설치 가능성 확보)
- icons/              → 앱 아이콘 세트 (any + maskable)

■ 1단계: 호스팅 (반드시 HTTPS 필요)
아래 중 하나를 선택해 이 폴더 전체를 그대로 업로드하세요.
- GitHub Pages (무료, 가장 간단)
- Netlify / Vercel (드래그 앤 드롭 업로드 가능)
- Firebase Hosting

주의: 폴더 구조(icons/ 하위 경로)를 유지한 채 업로드해야 합니다.
index.html은 기본 문서이므로 접속 시 파일명 없이
https://내도메인.com/ 로도 바로 열립니다.

■ 2단계: PWABuilder로 점검
1) https://www.pwabuilder.com 접속
2) 배포된 URL 입력 (예: https://내도메인.com/)
3) "Manifest", "Service Worker", "Security(HTTPS)" 3개 항목이
   모두 초록색(통과)인지 확인
4) 문제가 있으면 PWABuilder가 자동으로 보완 옵션을 제시함

■ 3단계: Android 패키지(APK/AAB) 생성
1) PWABuilder 결과 화면에서 "Package For Stores" 클릭
2) Android 선택 → 패키지 이름, 버전 등 입력 후 생성
3) 다운로드된 zip 안에 APK/AAB 파일과
   assetlinks.json 파일이 포함됨
4) assetlinks.json은 사이트의 /.well-known/ 폴더에 업로드해야
   앱이 주소창 없는 완전한 앱처럼 보임 (Trusted Web Activity 검증용)

■ 참고 (보안)
index.html 안에 카카오 API 키, 기상청 API 키가 코드에 그대로 노출되어
있습니다. 개인 사용 시에는 무방하지만, 앱을 여러 사람과 공유/배포할
계획이라면 키 도용을 막기 위해 서버(프록시) 경유 방식으로 바꾸는 것을
권장드립니다. 지금 당장 APK 변환 자체에는 문제되지 않습니다.
