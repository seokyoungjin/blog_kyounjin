export interface Post {
  id: string
  title: string
  content: string
  excerpt: string | null
  slug: string
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  author_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  view_count: number
  read_time: number
}

export interface CreatePostData {
  title: string
  content: string
  excerpt?: string
  slug: string
  status?: 'draft' | 'published' | 'archived'
  tags?: string[]
  read_time?: number
}

export interface UpdatePostData extends Partial<CreatePostData> {
  published_at?: string | null
}

export interface PostStats {
  total: number
  published: number
  draft: number
} 