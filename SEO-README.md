# SEO 설정 안내

## 생성된 파일들

이 프로젝트에는 SEO 최적화를 위해 다음 파일들이 생성되었습니다:

### 1. `app/robots.ts`

- 검색엔진 크롤러를 위한 robots.txt를 동적으로 생성
- `/admin/`과 `/api/` 경로는 크롤링 제외
- sitemap.xml 위치 자동 포함

### 2. `app/sitemap.ts`

- XML 사이트맵을 동적으로 생성
- 정적 페이지들과 데이터베이스의 게시글들을 자동으로 포함
- 각 페이지의 우선순위와 업데이트 빈도 설정

## 현재 배포 정보

**배포 URL**: https://blog-kyounjin.vercel.app/

## 환경 변수 설정 (선택사항)

기본값으로 배포 도메인이 설정되어 있습니다. 다른 도메인을 사용하려면 `.env.local` 파일에 다음을 설정하세요:

```env
# 사이트 URL (기본값: https://blog-kyounjin.vercel.app)
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com

# Supabase 설정 (이미 있다면 추가 필요 없음)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 확인 방법

현재 배포된 사이트에서 다음 URL로 확인할 수 있습니다:

- **robots.txt**: https://blog-kyounjin.vercel.app/robots.txt
- **sitemap.xml**: https://blog-kyounjin.vercel.app/sitemap.xml
- **개발 환경**: http://localhost:3000/robots.txt, http://localhost:3000/sitemap.xml

## 프로덕션 배포 완료 ✅

1. ✅ 실제 도메인으로 설정 완료 (`https://blog-kyounjin.vercel.app`)
2. 🔄 Google Search Console에 사이트맵 등록 (https://blog-kyounjin.vercel.app/sitemap.xml)
3. 🔄 robots.txt에서 필요에 따라 추가 규칙 설정

## SEO 개선 포인트

- 각 페이지에 적절한 meta tags 추가
- Open Graph 태그 설정
- JSON-LD 구조화 데이터 추가
- 페이지 로딩 속도 최적화

## 다음 단계

1. **Google Search Console 등록**:

   - https://search.google.com/search-console 접속
   - 사이트 등록 후 sitemap 제출: `https://blog-kyounjin.vercel.app/sitemap.xml`

2. **네이버 웹마스터도구 등록**:
   - https://searchadvisor.naver.com 접속
   - 사이트 등록 후 sitemap 제출
