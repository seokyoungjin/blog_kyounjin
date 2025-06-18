import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import { postsService } from "@/lib/posts"
import { Post } from "@/types/post"

// 날짜 포맷팅 함수
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 읽기 시간 계산 함수
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default async function HomePage() {
  // 최근 발행된 글 가져오기 (에러 핸들링 포함)
  let recentPosts: Post[] = []
  
  try {
    recentPosts = await postsService.getRecentPosts(5)
  } catch (error) {
    // 개발 환경에서 에러 로깅
    if (process.env.NODE_ENV === 'development') {
      console.error('Home page error loading recent posts:', error)
    }
    // 에러가 발생해도 빈 배열로 처리하여 페이지가 깨지지 않도록 함
    recentPosts = []
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-12">
              안녕하세요,
              <br />
              <span className="text-gray-700">개발자 서경진입니다</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              프론트엔드 개발자로서 새로운 기술을 탐구하고, 배운 것들을 기록하며 공유하는 공간입니다. 함께 성장해나가요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
                <Link href="/articles">
                  최신 글 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-black text-black hover:bg-gray-50">
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">최근 글</h2>
            <p className="text-gray-600 text-lg">최근에 작성한 개발 관련 글들을 확인해보세요</p>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-black hover:text-gray-700 transition-colors">
                      <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.published_at ? formatDate(post.published_at) : '미발행'}
                      </div>
                      <span>{post.read_time}분 읽기</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/articles/${post.slug}`}
                      className="inline-flex items-center text-black hover:text-gray-700 font-medium transition-colors"
                    >
                      더 읽기
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">아직 게시글이 없습니다.</p>
              <Button asChild variant="outline" className="border-black text-black hover:bg-gray-50">
                <Link href="/articles">게시글 목록 보기</Link>
              </Button>
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-black text-black hover:bg-gray-50">
              <Link href="/articles">모든 글 보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
