"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash2, Eye, BarChart3, LogOut, Save, X } from "lucide-react"
import AdminGuard from "@/components/admin-guard"
import { useAuth } from "@/hooks/use-auth"
import { postsService } from "@/lib/posts"
import { Post, CreatePostData, PostStats } from "@/types/post"

// 날짜 포맷팅 함수
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function AdminDashboard() {
  const router = useRouter()
  const { signOut, user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [stats, setStats] = useState<PostStats>({ total: 0, published: 0, draft: 0 })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    status: 'published',
    tags: [],
    read_time: 5
  })

  // 데이터 로드
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [postsData, statsData] = await Promise.all([
        postsService.getAllPosts(),
        postsService.getStats()
      ])
      setPosts(postsData)
      setStats(statsData)
    } catch (error) {
      console.error('데이터 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push("/admin/login")
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await postsService.createPost(formData)
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        status: 'published',
        tags: [],
        read_time: 5
      })
      setShowForm(false)
      loadData()
    } catch (error) {
      console.error('글 생성 실패:', error)
    }
  }

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return
    
    try {
      await postsService.updatePost(editingPost.id, formData)
      setEditingPost(null)
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        status: 'published',
        tags: [],
        read_time: 5
      })
      loadData()
    } catch (error) {
      console.error('글 수정 실패:', error)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('정말로 이 글을 삭제하시겠습니까?')) return
    
    try {
      await postsService.deletePost(id)
      loadData()
    } catch (error) {
      console.error('글 삭제 실패:', error)
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      slug: post.slug,
      status: post.status,
      tags: post.tags,
      read_time: post.read_time
    })
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setShowForm(false)
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      slug: '',
      status: 'published',
      tags: [],
      read_time: 5
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">관리자 페이지</h1>
      {/* 새 글 작성 폼 */}
      <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-4 border p-4 rounded mb-8">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="제목"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="슬러그 (영어, 숫자, - 만)"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="요약"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          placeholder="내용"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          required
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">저장</button>
      </form>

      {/* 글 목록 */}
      <div>
        <h2 className="font-semibold mb-4">글 목록</h2>
        {posts.map(post => (
          <div key={post.id} className="flex items-center justify-between border-b py-2">
            <div>
              <div className="font-bold">{post.title}</div>
              <div className="text-xs text-gray-500">{post.created_at?.slice(0, 10)}</div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() => router.push(`/articles/${post.slug}`)}
              >
                보기
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDeletePost(post.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  )
}
