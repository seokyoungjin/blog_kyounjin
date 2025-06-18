import { postsService } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

interface ArticlePageProps {
  params: { slug: string }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    // slug 검증
    if (!params.slug || typeof params.slug !== 'string') {
      return notFound()
    }

    const post = await postsService.getPostBySlug(params.slug)

    if (!post) {
      return notFound()
    }

    return (
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-8">
          {post.published_at ? new Date(post.published_at).toLocaleDateString('ko-KR') : '발행 예정'}
        </div>
        <div className="prose prose-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    )
  } catch (error) {
    // 개발 환경에서 에러 로깅
    if (process.env.NODE_ENV === 'development') {
      console.error('Article page error:', error)
    }
    
    // PostError인 경우 적절한 처리
    if (error instanceof Error && error.name === 'PostError') {
      // 사용자 친화적인 에러 메시지가 이미 포함되어 있으므로 그대로 throw
      throw error
    }
    
    // 기타 예상치 못한 에러는 notFound()로 처리
    return notFound()
  }
} 