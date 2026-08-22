import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

const AdminNews = () => {
  const [articles] = useState([
    { id: 1, title: 'Kenya Prepares for AFCON Qualifier Showdown', category: 'Football', status: 'published', isFeatured: true, isBreaking: true, date: '2026-08-22' },
    { id: 2, title: 'Gor Mahia Announce New Signing Ahead of KPL Season', category: 'Football', status: 'published', isFeatured: false, isBreaking: true, date: '2026-08-21' },
    { id: 3, title: 'Premier League Weekend Preview: Title Race Heats Up', category: 'Football', status: 'draft', isFeatured: false, isBreaking: false, date: '2026-08-20' },
    { id: 4, title: 'NBA Playoffs: Conference Finals Set', category: 'Basketball', status: 'published', isFeatured: false, isBreaking: false, date: '2026-08-19' },
    { id: 5, title: 'Athletics: Kenyan Dominates Berlin Marathon', category: 'Athletics', status: 'draft', isFeatured: false, isBreaking: false, date: '2026-08-18' },
    { id: 6, title: 'Champions League Draw: Group Stage Revealed', category: 'Football', status: 'published', isFeatured: true, isBreaking: false, date: '2026-08-17' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your news articles</p>
        </div>
        <Link
          to="/admin/news/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-dark"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-4 border-b flex items-center gap-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Football</option>
            <option>Basketball</option>
            <option>Athletics</option>
            <option>Rugby</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Article</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Status</th>
                <th className="text-center py-3 px-5 font-medium text-gray-500">Featured</th>
                <th className="text-center py-3 px-5 font-medium text-gray-500">Breaking</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-5">
                    <span className="font-medium text-gray-900">{article.title}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      article.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-center">
                    {article.isFeatured && (
                      <span className="text-gold">★</span>
                    )}
                  </td>
                  <td className="py-3 px-5 text-center">
                    {article.isBreaking && (
                      <span className="text-red-600 font-bold text-xs">BREAKING</span>
                    )}
                  </td>
                  <td className="py-3 px-5 text-gray-500">{article.date}</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Edit size={15} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                        {article.status === 'published' ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminNews
