import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"

// Mock data for recent posts
const recentPosts = [
  {
    id: 1,
    title: "Next.js 15의 새로운 기능들",
    excerpt: "Next.js 15에서 추가된 새로운 기능들과 개선사항들을 살펴보겠습니다.",
    date: "2024-01-15",
    readTime: "5분",
  },
  {
    id: 2,
    title: "React Server Components 완벽 가이드",
    excerpt: "React Server Components의 개념부터 실제 구현까지 상세히 알아보겠습니다.",
    date: "2024-01-10",
    readTime: "8분",
  },
  {
    id: 3,
    title: "TypeScript 5.0 새로운 기능 정리",
    excerpt: "TypeScript 5.0에서 추가된 새로운 기능들과 변경사항을 정리했습니다.",
    date: "2024-01-05",
    readTime: "6분",
  },
  {
    id: 4,
    title: "효율적인 Git 워크플로우 구축하기",
    excerpt: "팀 개발에서 효율적인 Git 워크플로우를 구축하는 방법을 공유합니다.",
    date: "2023-12-28",
    readTime: "7분",
  },
  {
    id: 5,
    title: "웹 성능 최적화 실전 가이드",
    excerpt: "실제 프로젝트에서 적용할 수 있는 웹 성능 최적화 기법들을 소개합니다.",
    date: "2023-12-20",
    readTime: "10분",
  },
]

export default function HomePage() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-black hover:text-gray-700 transition-colors">
                    <Link href={`/articles/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <span>{post.readTime} 읽기</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                  <Link
                    href={`/articles/${post.id}`}
                    className="inline-flex items-center text-black hover:text-gray-700 font-medium mt-4 transition-colors"
                  >
                    더 읽기
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

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
