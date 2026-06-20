import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { mockBlogPosts } from '@/app/data/blog';
import BlogPostDetailClient from './BlogPostDetailClient';

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Artículo No Encontrado | El Dueño Vende',
    };
  }

  const title = `${post.title} | El Dueño Vende`;
  const description = post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://elduenovende.com/blog/${slug}`,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-6 pt-24 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Artículo No Encontrado</h1>
          <p className="text-slate-400 text-center max-w-md">
            Lo sentimos, el artículo de blog que estás buscando no existe o fue dado de baja.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPosts = mockBlogPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <Navbar />
      <BlogPostDetailClient post={post} relatedPosts={relatedPosts} />
      <Footer />
    </>
  );
}
