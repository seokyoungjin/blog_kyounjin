import { MetadataRoute } from "next";
import { postsService } from "@/lib/posts";

// URL-safe slug 생성 함수
function createSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://blog-kyounjin.vercel.app";

  // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // 동적 페이지들 (게시글)
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const posts = await postsService.getPublishedPosts();

    dynamicPages = posts.map((post) => ({
      url: `${baseUrl}/articles/${createSlug(post.category)}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating sitemap for posts:", error);
    // 에러가 발생해도 정적 페이지들은 포함
  }

  return [...staticPages, ...dynamicPages];
}
