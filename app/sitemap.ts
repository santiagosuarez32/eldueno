import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { mockProperties } from '@/app/data/properties';
import { mockBlogPosts } from '@/app/data/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.elduenovende.com';

  // Base static routes
  const staticRoutes = [
    '',
    '/nosotros',
    '/propiedades',
    '/compra-y-venta',
    '/arquitectura',
    '/prestamos',
    '/contacto',
    '/blog',
    '/terminos',
    '/privacidad'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // 1. Fetch properties
    const { data: properties, error: propError } = await supabase
      .from('properties')
      .select('id, created_at');

    if (!propError && properties && properties.length > 0) {
      const propertyRoutes = properties.map((prop) => ({
        url: `${baseUrl}/propiedades/${prop.id}`,
        lastModified: prop.created_at ? new Date(prop.created_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
      dynamicRoutes = [...dynamicRoutes, ...propertyRoutes];
    } else {
      // Fallback to mock properties
      const propertyRoutes = mockProperties.map((prop) => ({
        url: `${baseUrl}/propiedades/${prop.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
      dynamicRoutes = [...dynamicRoutes, ...propertyRoutes];
    }

    // 2. Fetch blogs
    const { data: blogs, error: blogError } = await supabase
      .from('blogs')
      .select('slug, created_at')
      .eq('published', true);

    if (!blogError && blogs && blogs.length > 0) {
      const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.created_at ? new Date(blog.created_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
      dynamicRoutes = [...dynamicRoutes, ...blogRoutes];
    } else {
      // Fallback to mock blogs
      const blogRoutes = mockBlogPosts.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
      dynamicRoutes = [...dynamicRoutes, ...blogRoutes];
    }
  } catch (error) {
    console.warn("Error fetching dynamic data for sitemap:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
