import { useParams } from 'react-router-dom'
import { Calendar, User } from 'lucide-react'
import useNews from '../hooks/useNews'
import NewsCard from '../components/NewsCard'
import ErrorMessage from '../components/ErrorMessage'

const News = () => {
  const { slug } = useParams()
  const query = slug ? undefined : {}
  const { news, loading, error } = useNews(query)

  if (slug && news.length > 0) {
    const article = news.find((n) => n.slug === slug) || news[0]
    if (!article) return <ErrorMessage message="Article not found" />

    return (
      <article className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {article.category && (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                {article.category}
              </span>
            )}
            {article.isBreaking && (
              <span className="text-xs font-bold text-red-600">BREAKING</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{article.author || 'Afro Sports'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>

          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
              onError={(e) => {
                e.target.src = '/placeholder-image.svg'
              }}
            />
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">News</h1>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      )}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <NewsCard key={item.slug || item.id} news={item} />
          ))}
        </div>
      )}

      {!loading && !error && news.length === 0 && (
        <p className="text-gray-500">No news articles found</p>
      )}
    </div>
  )
}

export default News
