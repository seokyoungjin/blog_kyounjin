import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { postsService } from "@/lib/posts";
import { Post } from "@/types/post";

// 날짜 포맷팅 함수
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// URL-safe slug 생성 함수
function createSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ArticlesPage() {
  // 모든 발행된 글 가져오기 (에러 핸들링 포함)
  let posts: Post[] = [];

  try {
    posts = await postsService.getPublishedPosts();
  } catch (error) {
    // 개발 환경에서 에러 로깅
    if (process.env.NODE_ENV === "development") {
      console.error("Articles page error loading posts:", error);
    }
    // 에러가 발생해도 빈 배열로 처리하여 페이지가 깨지지 않도록 함
    posts = [];
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            모든 글
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            개발과 관련된 모든 글들을 확인해보세요. 프론트엔드, 백엔드, DevOps
            등 다양한 주제의 글을 찾을 수 있습니다.
          </p>
        </div>

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-black hover:text-gray-700 transition-colors">
                    <Link href={`/articles/${createSlug(post.category)}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.published_at
                        ? formatDate(post.published_at)
                        : "미발행"}
                    </div>
                    <span>{post.read_time}분 읽기</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.excerpt || post.content.substring(0, 150) + "..."}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded flex items-center"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/articles/${createSlug(post.category)}`}
                      className="inline-flex items-center text-black hover:text-gray-700 font-medium transition-colors"
                    >
                      더 읽기
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                    <span className="text-sm text-gray-500">
                      조회수 {post.view_count.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              아직 글이 없습니다
            </h3>
            <p className="text-gray-500 mb-6">
              곧 새로운 글들이 추가될 예정입니다.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-black text-black hover:bg-gray-50"
            >
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-black text-black hover:bg-gray-50"
          >
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
