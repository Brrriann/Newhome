# 아임웹 전체화면 임베드 (도메인 이전 전 임시 노출)

도메인을 아임웹에서 이전하기 전까지, **Cloudflare Pages에 배포된 사이트**
(`https://newhome-dg3.pages.dev/`)를 아임웹 페이지 위에 **전체 화면 단독
페이지**로 보여주기 위한 코드입니다.

> 이 브랜치(`imweb-embed`)는 임시 운영용입니다. **`main`에 합치지 않습니다.**

## 왜 iframe 방식인가

이 사이트는 Next.js + Spline 3D + framer-motion 으로 만든 동적 페이지라,
아임웹 에디터에 HTML로 그대로 옮길 수 없습니다. 이미 Cloudflare Pages에
배포되어 있으므로, 그 URL을 아임웹 페이지에 **전체화면 iframe**으로
임베드하는 것이 가장 간단하고 깨지지 않는 방법입니다.

(점검: 응답 헤더에 iframe을 막는
`X-Frame-Options` / `Content-Security-Policy: frame-ancestors` 가
없어 임베드가 동작할 것으로 보입니다. 적용 후 실제 브라우저에서
한 번 확인하세요.)

## 적용 방법

1. 아임웹 관리자 로그인
2. 임시로 노출할 페이지를 하나 만들거나 선택
   - 가급적 빈 페이지(섹션/위젯 없는 페이지)를 권장합니다.
3. 페이지 편집 화면에서 **"HTML 삽입"** (코드 삽입 / 위젯 > HTML) 추가
4. [`fullscreen-embed.html`](./fullscreen-embed.html) 파일의 **내용 전체**를
   복사해 붙여넣기
5. 저장 후 페이지 미리보기로 확인

붙여넣으면 화면 전체(viewport)를 iframe이 덮어, 방문자는 아임웹의
헤더/푸터 없이 이 사이트만 보게 됩니다.

## 도메인 연결 (선택)

특정 주소(예: `magnate.co.kr`)로 접속했을 때 이 페이지가 뜨게 하려면,
아임웹에서 해당 도메인/페이지를 위 임베드 페이지로 연결하면 됩니다.

## 도메인 이전이 끝나면

이전이 완료되어 Cloudflare(또는 최종 호스팅)로 도메인이 직접 연결되면,
이 아임웹 임베드 페이지는 더 이상 필요 없으니 삭제하거나 비공개로
전환하세요. 이 브랜치도 그 시점에 정리하면 됩니다.

## 주의 사항

- **iframe 차단 헤더**: 임베드 대상(`newhome-dg3.pages.dev`)이
  `X-Frame-Options: DENY` 또는 `Content-Security-Policy: frame-ancestors`
  로 iframe을 막으면 화면이 비어 보입니다. 현재는 그런 헤더가 없어
  정상 표시됩니다. 혹시 나중에 안 보이면 Cloudflare Pages 쪽 응답
  헤더(또는 `_headers` 파일)를 확인하세요.
- **HTTPS**: 아임웹 페이지와 임베드 대상이 모두 https라야 합니다.
  (둘 다 https이므로 문제 없음)
- **모바일 주소창**: `100dvh`로 모바일 주소창 높이 변화에 대응했습니다.
  미지원 구형 브라우저에서는 `100vh`로 폴백됩니다.
- **URL 변경 시**: 배포 주소가 바뀌면 `fullscreen-embed.html`의
  `src="https://newhome-dg3.pages.dev/"` 부분만 새 주소로 바꿔주세요.
