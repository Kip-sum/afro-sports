import { Link } from 'react-router-dom'

const NewsCard = ({ news, featured = false }) => {
  return (
    <Link
      to={`/news/${news.slug || news.id}`}
      className={`block group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
        featured ? 'md:flex' : ''
      }`}
    >
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className={`object-cover group-hover:opacity-90 transition-opacity ${
            featured ? 'w-full md:w-64 h-48 md:h-auto' : 'w-full h-32'
          }`}
          onError={(e) => {
            e.target.src = '/placeholder-image.svg'
          }}
        />
      )}

      <div className="p-4 flex-1">
        <div className="flex items-center gap-2 mb-2">
          {news.category && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
              {news.category}
            </span>
          )}
          {news.isBreaking && (
            <span className="text-xs font-bold text-red-600">BREAKING</span>
          )}
          {news.isFeatured && (
            <span className="text-xs font-bold text-gold">FEATURED</span>
          )}
        </div>

        <h3
          className={`font-bold group-hover:text-primary transition-colors line-clamp-2 ${
            featured ? 'text-xl' : 'text-base'
          }`}
        >
          {news.title}
        </h3>

        {news.excerpt && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{news.excerpt}</p>
        )}

        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span>{news.author || 'Afro Sports'}</span>
          <span>&middot;</span>
          <time dateTime={news.publishedAt}>
            {new Date(news.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>
    </Link>
  )
}

export default NewsCard
