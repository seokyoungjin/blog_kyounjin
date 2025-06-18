import { supabase } from './supabase'
import { Post, CreatePostData, UpdatePostData, PostStats } from '@/types/post'

// 사용자 친화적인 에러 클래스
class PostError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'PostError'
  }
}

// Supabase 에러를 사용자 친화적인 에러로 변환
function handleSupabaseError(error: any, context: string): never {
  console.error(`Supabase Error in ${context}:`, error)
  
  // Supabase 에러 코드별 처리
  switch (error.code) {
    case 'PGRST116': // 데이터 없음
      throw new PostError('요청하신 데이터를 찾을 수 없습니다.', error.code)
    case '23505': // 중복 키 (unique constraint violation)
      throw new PostError('이미 존재하는 데이터입니다.', error.code)
    case '23503': // 외래 키 제약 조건 위반
      throw new PostError('관련된 데이터가 없어 처리할 수 없습니다.', error.code)
    case '42501': // 권한 없음
      throw new PostError('이 작업을 수행할 권한이 없습니다.', error.code)
    case '42P01': // 테이블 없음
      throw new PostError('데이터베이스 테이블을 찾을 수 없습니다.', error.code)
    default:
      throw new PostError(
        error.message || '데이터베이스 작업 중 오류가 발생했습니다.',
        error.code
      )
  }
}

export const postsService = {
  // 모든 발행된 글 가져오기
  async getPublishedPosts(): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) handleSupabaseError(error, 'getPublishedPosts')
      return data || []
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('게시글 목록을 불러오는 중 오류가 발생했습니다.')
    }
  },

  // 최근 발행된 글 가져오기 (published_at이 null이 아닌 글만, 최신순)
  async getRecentPosts(limit: number = 5): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (error) handleSupabaseError(error, 'getRecentPosts')
      return data || []
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('최근 게시글을 불러오는 중 오류가 발생했습니다.')
    }
  },

  // 특정 글 가져오기
  async getPostBySlug(slug: string): Promise<Post | null> {
    try {
      if (!slug) {
        throw new PostError('게시글 주소가 제공되지 않았습니다.')
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // 데이터 없음 - notFound()로 처리
        }
        handleSupabaseError(error, 'getPostBySlug')
      }
      return data
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('게시글을 불러오는 중 오류가 발생했습니다.')
    }
  },

  // 관리자용: 모든 글 가져오기
  async getAllPosts(): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) handleSupabaseError(error, 'getAllPosts')
      return data || []
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('모든 게시글을 불러오는 중 오류가 발생했습니다.')
    }
  },

  // 관리자용: 글 생성 (author_id 자동 할당, published_at 자동 할당)
  async createPost(postData: CreatePostData): Promise<Post> {
    try {
      // 현재 로그인한 유저 정보 가져오기
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) throw new PostError('인증 정보를 확인할 수 없습니다.')
      if (!user) throw new PostError('로그인이 필요합니다.')

      // 필수 필드 검증
      if (!postData.title?.trim()) {
        throw new PostError('제목은 필수입니다.')
      }
      if (!postData.slug?.trim()) {
        throw new PostError('게시글 주소는 필수입니다.')
      }
      if (!postData.content?.trim()) {
        throw new PostError('내용은 필수입니다.')
      }

      // status가 published면 published_at을 현재 시각으로 자동 할당
      const now = new Date().toISOString()
      const dataToInsert = {
        ...postData,
        author_id: user.id,
        published_at: postData.status === 'published' ? now : null
      }

      const { data, error } = await supabase
        .from('posts')
        .insert([dataToInsert])
        .select()
        .single()

      if (error) handleSupabaseError(error, 'createPost')
      return data
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('게시글을 생성하는 중 오류가 발생했습니다.')
    }
  },

  // 관리자용: 글 수정
  async updatePost(id: string, postData: UpdatePostData): Promise<Post> {
    try {
      if (!id) {
        throw new PostError('게시글 ID가 제공되지 않았습니다.')
      }

      const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single()

      if (error) handleSupabaseError(error, 'updatePost')
      return data
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('게시글을 수정하는 중 오류가 발생했습니다.')
    }
  },

  // 관리자용: 글 삭제
  async deletePost(id: string): Promise<void> {
    try {
      if (!id) {
        throw new PostError('게시글 ID가 제공되지 않았습니다.')
      }

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) handleSupabaseError(error, 'deletePost')
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('게시글을 삭제하는 중 오류가 발생했습니다.')
    }
  },

  // 조회수 증가
  async incrementViewCount(id: string): Promise<void> {
    try {
      if (!id) {
        throw new PostError('게시글 ID가 제공되지 않았습니다.')
      }

      const { error } = await supabase.rpc('increment_view_count', { post_id: id })
      if (error) handleSupabaseError(error, 'incrementViewCount')
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('조회수를 업데이트하는 중 오류가 발생했습니다.')
    }
  },

  // 통계 가져오기
  async getStats(): Promise<PostStats> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('status')

      if (error) handleSupabaseError(error, 'getStats')

      const posts = data || []
      return {
        total: posts.length,
        published: posts.filter(p => p.status === 'published').length,
        draft: posts.filter(p => p.status === 'draft').length
      }
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('통계를 불러오는 중 오류가 발생했습니다.')
    }
  },

  // 태그로 글 검색
  async getPostsByTag(tag: string): Promise<Post[]> {
    try {
      if (!tag?.trim()) {
        throw new PostError('검색할 태그가 제공되지 않았습니다.')
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .contains('tags', [tag])
        .order('published_at', { ascending: false })

      if (error) handleSupabaseError(error, 'getPostsByTag')
      return data || []
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('태그로 게시글을 검색하는 중 오류가 발생했습니다.')
    }
  },

  // 제목으로 글 검색
  async searchPosts(query: string): Promise<Post[]> {
    try {
      if (!query?.trim()) {
        throw new PostError('검색어가 제공되지 않았습니다.')
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('published_at', { ascending: false })

      if (error) handleSupabaseError(error, 'searchPosts')
      return data || []
    } catch (error) {
      if (error instanceof PostError) throw error
      throw new PostError('게시글을 검색하는 중 오류가 발생했습니다.')
    }
  }
} 