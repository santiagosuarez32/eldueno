'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/app/data/blog';

interface BlogPostDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostDetailClient({ post, relatedPosts }: BlogPostDetailClientProps) {
  return (
    <main className="min-h-screen pt-28 pb-24 bg-white text-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors text-sm group"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-slate-500 transform group-hover:-translate-x-1 transition-transform" />
            Volver al blog
          </Link>
        </div>

        {/* Meta Info */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {post.readTime} de lectura
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-slate-400" />
              {post.author}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {post.title}
          </h1>
          
          <p className="text-slate-500 text-lg sm:text-xl leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="my-10 aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-md bg-slate-200">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Post Content */}
        <article className="prose prose-slate max-w-none prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-950 prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-600 prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 whitespace-pre-line">
          {post.content}
        </article>

        {/* Related Articles */}
        <div className="mt-20 pt-12 border-t border-slate-200 space-y-8">
          <h3 className="text-2xl font-bold text-slate-950">Artículos Recomendados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relPost) => (
              <Link
                key={relPost.slug}
                href={`/blog/${relPost.slug}`}
                className="group flex flex-col bg-white border border-slate-100 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
              >
                <div className="aspect-[1.5/1] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={relPost.image}
                    alt={relPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-emerald-600 font-bold block">{relPost.category}</span>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug">
                      {relPost.title}
                    </h4>
                  </div>
                  <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-950 group-hover:text-emerald-500 transition-colors">
                    <span>Leer Artículo</span>
                    <div className="h-6 w-6 rounded-full bg-slate-950 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-slate-950">
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
