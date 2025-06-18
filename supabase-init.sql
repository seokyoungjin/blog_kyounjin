-- 블로그 글 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  read_time INTEGER DEFAULT 5 -- 읽기 시간 (분)
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- updated_at 자동 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_posts_updated_at 
  BEFORE UPDATE ON posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
-- 모든 사용자가 발행된 글을 읽을 수 있음
CREATE POLICY "Published posts are viewable by everyone" ON posts
  FOR SELECT USING (status = 'published');

-- 인증된 사용자만 자신의 글을 관리할 수 있음
CREATE POLICY "Users can manage their own posts" ON posts
  FOR ALL USING (auth.uid() = author_id);

-- 관리자는 모든 글을 관리할 수 있음 (선택사항)
-- CREATE POLICY "Admins can manage all posts" ON posts
--   FOR ALL USING (
--     EXISTS (
--       SELECT 1 FROM auth.users 
--       WHERE auth.users.id = auth.uid() 
--       AND auth.users.email = 'admin@example.com'
--     )
--   );

-- 샘플 데이터 삽입 (테스트용)
INSERT INTO posts (title, content, excerpt, slug, status, tags, published_at, view_count, read_time) VALUES
(
  'Next.js 15의 새로운 기능들',
  '# Next.js 15의 새로운 기능들

Next.js 15가 출시되면서 많은 새로운 기능들이 추가되었습니다. 이 글에서는 주요 변경사항들을 살펴보겠습니다.

## 주요 개선사항

### 1. 성능 향상
- 더 빠른 빌드 시간
- 개선된 번들링 최적화
- 향상된 캐싱 메커니즘

### 2. 개발자 경험 개선
- 더 나은 에러 메시지
- 개선된 TypeScript 지원
- 새로운 디버깅 도구

### 3. 새로운 기능들
- Partial Prerendering
- Server Actions 개선
- 향상된 이미지 최적화

## 결론

Next.js 15는 성능과 개발자 경험 모두에서 큰 향상을 가져왔습니다. 새로운 프로젝트를 시작한다면 Next.js 15를 사용하는 것을 강력히 권장합니다.',
  'Next.js 15에서 추가된 새로운 기능들과 개선사항들을 살펴보겠습니다.',
  'nextjs-15-new-features',
  'published',
  ARRAY['Next.js', 'React', 'JavaScript', 'Web Development'],
  NOW() - INTERVAL '3 days',
  1234,
  5
),
(
  'React Server Components 완벽 가이드',
  '# React Server Components 완벽 가이드

React Server Components는 React의 새로운 패러다임입니다. 이 글에서는 RSC의 개념부터 실제 구현까지 상세히 알아보겠습니다.

## Server Components란?

Server Components는 서버에서 렌더링되는 React 컴포넌트입니다. 클라이언트로 전송되는 JavaScript 번들 크기를 줄이고 성능을 향상시킵니다.

## 주요 특징

### 1. 서버에서 실행
- 데이터베이스 직접 접근
- 파일 시스템 접근
- 보안 정보 안전하게 처리

### 2. 번들 크기 감소
- 클라이언트로 전송되지 않음
- 자동 코드 분할

### 3. 향상된 성능
- 더 빠른 초기 로딩
- 개선된 SEO

## 구현 예제

```jsx
// Server Component
async function PostList() {
  const posts = await fetchPosts();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## 결론

Server Components는 React의 미래입니다. 점진적으로 도입하여 애플리케이션의 성능을 향상시킬 수 있습니다.',
  'React Server Components의 개념부터 실제 구현까지 상세히 알아보겠습니다.',
  'react-server-components-guide',
  'published',
  ARRAY['React', 'Server Components', 'JavaScript', 'Web Development'],
  NOW() - INTERVAL '8 days',
  2156,
  8
),
(
  'TypeScript 5.0 새로운 기능 정리',
  '# TypeScript 5.0 새로운 기능 정리

TypeScript 5.0이 출시되면서 많은 새로운 기능들이 추가되었습니다. 이 글에서는 주요 변경사항을 정리해보겠습니다.

## 주요 새 기능

### 1. Decorators
- ECMAScript 표준 Decorators 지원
- 클래스와 클래스 멤버에 적용 가능

### 2. const Type Parameters
- 제네릭 타입 매개변수의 const 추론
- 더 정확한 타입 추론

### 3. Multiple Config Files
- 여러 tsconfig.json 파일 지원
- 프로젝트별 설정 분리

### 4. Performance Improvements
- 더 빠른 타입 체크
- 개선된 메모리 사용량

## 사용 예제

```typescript
// Decorators 예제
@sealed
class Greeter {
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
  
  @log
  greet() {
    return "Hello, " + this.greeting;
  }
}

// const Type Parameters 예제
function first<T extends readonly unknown[]>(arr: T): T[0] {
  return arr[0];
}
```

## 마이그레이션 가이드

기존 TypeScript 4.x 프로젝트에서 5.0으로 마이그레이션할 때 주의사항들을 정리했습니다.

## 결론

TypeScript 5.0은 성능과 개발자 경험 모두에서 큰 향상을 가져왔습니다.',
  'TypeScript 5.0에서 추가된 새로운 기능들과 변경사항을 정리했습니다.',
  'typescript-5-new-features',
  'draft',
  ARRAY['TypeScript', 'JavaScript', 'Programming'],
  NULL,
  0,
  6
),
(
  '효율적인 Git 워크플로우 구축하기',
  '# 효율적인 Git 워크플로우 구축하기

팀 개발에서 효율적인 Git 워크플로우는 필수적입니다. 이 글에서는 실제 프로젝트에서 사용할 수 있는 워크플로우를 소개합니다.

## Git Flow vs GitHub Flow

### Git Flow
- 기능 브랜치, 릴리즈 브랜치, 핫픽스 브랜치 사용
- 복잡하지만 체계적인 관리

### GitHub Flow
- 단순하고 빠른 배포
- Pull Request 기반 워크플로우

## 추천 워크플로우

### 1. 브랜치 전략
```
main (production)
├── develop (integration)
├── feature/기능명
├── hotfix/긴급수정
└── release/버전명
```

### 2. 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 프로세스 수정
```

### 3. Pull Request 프로세스
1. 브랜치 생성
2. 개발 및 커밋
3. Pull Request 생성
4. 코드 리뷰
5. 머지 및 배포

## 도구 및 설정

- Git Hooks 설정
- CI/CD 파이프라인 구성
- 자동화된 테스트

## 결론

효율적인 Git 워크플로우는 팀의 생산성을 크게 향상시킵니다.',
  '팀 개발에서 효율적인 Git 워크플로우를 구축하는 방법을 공유합니다.',
  'efficient-git-workflow',
  'published',
  ARRAY['Git', 'Workflow', 'Development', 'Team'],
  NOW() - INTERVAL '15 days',
  987,
  7
),
(
  '웹 성능 최적화 실전 가이드',
  '# 웹 성능 최적화 실전 가이드

실제 프로젝트에서 적용할 수 있는 웹 성능 최적화 기법들을 소개합니다.

## 성능 측정 도구

### 1. Lighthouse
- Core Web Vitals 측정
- 성능 점수 제공
- 개선 제안

### 2. WebPageTest
- 상세한 성능 분석
- 다양한 환경에서 테스트
- 실시간 성능 모니터링

## 최적화 기법

### 1. 이미지 최적화
- WebP 포맷 사용
- 적절한 크기로 리사이징
- Lazy Loading 적용

### 2. 번들 최적화
- Tree Shaking
- Code Splitting
- Dynamic Import

### 3. 캐싱 전략
- 브라우저 캐싱
- CDN 활용
- Service Worker

### 4. 서버 최적화
- Gzip 압축
- HTTP/2 사용
- 데이터베이스 쿼리 최적화

## 실전 예제

```javascript
// Dynamic Import 예제
const LazyComponent = lazy(() => import('./LazyComponent'));

// 이미지 최적화 예제
<img 
  src="image.webp" 
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
  srcset="image-300.webp 300w, image-600.webp 600w"
/>
```

## 모니터링

- Real User Monitoring (RUM)
- 성능 메트릭 수집
- 알림 설정

## 결론

웹 성능 최적화는 지속적인 과정입니다. 정기적인 측정과 개선이 필요합니다.',
  '실제 프로젝트에서 적용할 수 있는 웹 성능 최적화 기법들을 소개합니다.',
  'web-performance-optimization-guide',
  'published',
  ARRAY['Performance', 'Web Development', 'Optimization', 'Frontend'],
  NOW() - INTERVAL '20 days',
  1567,
  10
);

-- 뷰 카운트 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts 
  SET view_count = view_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- 댓글 테이블 (선택사항)
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 댓글 인덱스
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);

-- 댓글 RLS 활성화
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 댓글 정책
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- 관리자만 댓글 승인/삭제 가능
CREATE POLICY "Admins can manage comments" ON comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = comments.post_id 
      AND posts.author_id = auth.uid()
    )
  ); 