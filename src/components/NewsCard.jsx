import { Link } from 'react-router-dom'
import { Calendar, User } from 'lucide-react'

const defaultImage = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'

const NewsCard = ({ news, featured = false }) => {
  const image = news.image || defaultImage

  return (
    <Link
      to={`/news/${news.slug || news.id}`}
      className={`block group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl ${
        featured ? 'md:flex' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'w-full md:w-72 h-48 md:h-auto' : 'w-full h-44'}`}>
        <img
          src={image}
          alt={news.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = defaultImage }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {news.category && (
            <span className="text-xs font-medium text-white bg-primary/90 px-2 py-0.5 rounded">
              {news.category}
            </span>
          )}
          {news.isBreaking && (
            <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded">
              BREAKING
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className={`font-bold group-hover:text-primary line-clamp-2 ${featured ? 'text-xl' : 'text-base'}`}>
          {news.title}
        </h3>

        {news.excerpt && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">{news.excerpt}</p>
        )}

        <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <User size={12} />
            {news.author || 'Afro Sports'}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} />
            {new Date(news.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default NewsCard
