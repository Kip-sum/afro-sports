import { Link } from 'react-router-dom'
import { Newspaper, TrendingUp, Eye, Edit, Trash2, Plus } from 'lucide-react'

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Articles', value: 24, icon: Newspaper, color: 'bg-blue-500' },
    { label: 'Published', value: 18, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Drafts', value: 6, icon: Edit, color: 'bg-yellow-500' },
    { label: 'Total Views', value: '12.4K', icon: Eye, color: 'bg-purple-500' },
  ]

  const recentArticles = [
    { id: 1, title: 'Kenya Prepares for AFCON Qualifier Showdown', status: 'published', date: '2026-08-22', views: 1240 },
    { id: 2, title: 'Gor Mahia Announce New Signing Ahead of KPL Season', status: 'published', date: '2026-08-21', views: 890 },
    { id: 3, title: 'Premier League Weekend Preview: Title Race Heats Up', status: 'draft', date: '2026-08-20', views: 0 },
    { id: 4, title: 'NBA Playoffs: Conference Finals Set', status: 'published', date: '2026-08-19', views: 2100 },
    { id: 5, title: 'Athletics: Kenyan Dominates Berlin Marathon', status: 'draft', date: '2026-08-18', views: 0 },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
        </div>
        <Link
          to="/admin/news/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-dark"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
              </div>
              <div className={`${color} p-3 rounded-lg`}>
                <Icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="font-bold text-lg">Recent Articles</h2>
          <Link to="/admin/news" className="text-sm text-primary hover:underline font-medium">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Title</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Views</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map((article) => (
                <tr key={article.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-5 font-medium text-gray-900 max-w-xs truncate">
                    {article.title}
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
                  <td className="py-3 px-5 text-gray-500">{article.date}</td>
                  <td className="py-3 px-5 text-gray-500">{article.views.toLocaleString()}</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Edit size={15} />
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

export default AdminDashboard
