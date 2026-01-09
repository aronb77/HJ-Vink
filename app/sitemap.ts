import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site-config'
import { CITY_DATA } from '@/lib/cities'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.metadata.baseUrl

    // Static routes
    const routes = [
        '',
        '/diensten',
        '/projecten',
        '/contact',
        '/offerte',
        '/voorwaarden',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic city routes
    const cityRoutes = Object.values(CITY_DATA).map((city) => ({
        url: `${baseUrl}/werkgebied/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9, // High priority as these are landing pages
    }))

    return [...routes, ...cityRoutes]
}
