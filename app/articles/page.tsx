import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, Search, Tag } from "lucide-react"

// Mock data for articles
const articles = [
  {
    id: 1,
    title: "Next.js 15의 새로운 기능들",
    excerpt: "Next.js 15에서 추가된 새로운 기능들과 개선사항들을 살펴보겠습니다.",
    date: "2024-01-15",
    readTime: "5분",
    tags: ["Next.js", "React", "Frontend"],
  },
  {
    id: 2,
    title: "React Server Components 완벽 가이드",
    excerpt: "React Server Components의 개념부터 실제 구현까지 상세히 알아보겠습니다.",
    date: "2024-01-10",
    readTime: "8분",
    tags: ["React", "Server Components", "Frontend"],
  },
  {
    id: 3,
    title: "TypeScript 5.0 새로운 기능 정리",
    excerpt: "TypeScript 5.0에서 추가된 새로운 기능들과 변경사항을 정리했습니다.",
    date: "2024-01-05",
    readTime: "6분",
    tags: ["TypeScript", "JavaScript"],
  },
  {
    id: 4,
    title: "효율적인 Git 워크플로우 구축하기",
    excerpt: "팀 개발에서 효율적인 Git 워크플로우를 구축하는 방법을 공유합니다.",
    date: "2023-12-28",
    readTime: "7분",
    tags: ["Git", "DevOps", "Workflow"],
  },
  {
    id: 5,
    title: "웹 성능 최적화 실전 가이드",
    excerpt: "실제 프로젝트에서 적용할 수 있는 웹 성능 최적화 기법들을 소개합니다.",
    date: "2023-12-20",
    readTime: "10분",
    tags: ["Performance", "Optimization", "Web"],
  },
  {
    id: 6,
    title: "CSS Grid vs Flexbox: 언제 무엇을 사용할까?",
    excerpt: "CSS Grid와 Flexbox의 차이점과 각각의 적절한 사용 시기를 알아봅니다.",
    date: "2023-12-15",
    readTime: "6분",
    tags: ["CSS", "Layout", "Frontend"],
  },
]

const allTags = Array.from(new Set(articles.flatMap((article) => article.tags)))

export default function ArticlesPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">Articles</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            개발하면서 배운 것들과 경험을 정리한 글들입니다.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="글 제목이나 내용으로 검색..." className="pl-10 border-gray-300 focus:border-black" />
            </div>
            <Button variant="outline" className="border-black text-black hover:bg-gray-50">
              검색
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">태그:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-black hover:text-gray-700 transition-colors">
                  <Link href={`/articles/${article.id}`}>{article.title}</Link>
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                  <span>{article.readTime} 읽기</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/articles/${article.id}`}
                  className="inline-flex items-center text-black hover:text-gray-700 font-medium transition-colors"
                >
                  더 읽기 →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-black text-black hover:bg-gray-50">
            더 많은 글 보기
          </Button>
        </div>
      </div>
    </div>
  )
}
