import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash2, Eye, BarChart3 } from "lucide-react"

// Mock data for admin dashboard
const stats = [
  { title: "총 글 수", value: "24", icon: BarChart3 },
  { title: "발행된 글", value: "21", icon: Eye },
  { title: "초안", value: "3", icon: Edit },
]

const recentPosts = [
  {
    id: 1,
    title: "Next.js 15의 새로운 기능들",
    status: "발행됨",
    date: "2024-01-15",
    views: "1,234",
  },
  {
    id: 2,
    title: "React Server Components 완벽 가이드",
    status: "발행됨",
    date: "2024-01-10",
    views: "2,156",
  },
  {
    id: 3,
    title: "TypeScript 5.0 새로운 기능 정리",
    status: "초안",
    date: "2024-01-05",
    views: "0",
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">글 관리</h1>
          <p className="text-gray-600">블로그 글 작성 및 관리</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-black">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black">빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                <PlusCircle className="mr-2 h-4 w-4" />새 글 작성
              </Button>
              <Button variant="outline" className="w-full border-black text-black hover:bg-gray-50">
                <Edit className="mr-2 h-4 w-4" />
                초안 관리
              </Button>
              <Button variant="outline" className="w-full border-black text-black hover:bg-gray-50">
                <BarChart3 className="mr-2 h-4 w-4" />글 통계 보기
              </Button>
            </CardContent>
          </Card>

          {/* Recent Posts Management */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black">최근 글 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-black truncate">{post.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            post.status === "발행됨" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.status}
                        </span>
                        <span>{post.date}</span>
                        <span>조회수: {post.views}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-black">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Post Form */}
        <Card className="mt-8 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black">빠른 글 작성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <Input placeholder="글 제목을 입력하세요..." className="border-gray-300 focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
              <Textarea placeholder="글 내용을 입력하세요..." rows={6} className="border-gray-300 focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
              <Input
                placeholder="태그를 쉼표로 구분하여 입력하세요..."
                className="border-gray-300 focus:border-black"
              />
            </div>
            <div className="flex space-x-4">
              <Button className="bg-black text-white hover:bg-gray-800">발행하기</Button>
              <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                초안 저장
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
