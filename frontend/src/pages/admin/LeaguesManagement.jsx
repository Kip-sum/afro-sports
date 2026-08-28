import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

const AdminLeagues = () => {
  const [leagues] = useState([
    { id: 1, name: 'Premier League', country: 'England', sport: 'Football', season: '2025/26', teams: 20 },
    { id: 2, name: 'Kenya Premier League', country: 'Kenya', sport: 'Football', season: '2025', teams: 18 },
    { id: 3, name: 'UEFA Champions League', country: 'Europe', sport: 'Football', season: '2025/26', teams: 36 },
    { id: 4, name: 'La Liga', country: 'Spain', sport: 'Football', season: '2025/26', teams: 20 },
    { id: 5, name: 'NBA', country: 'USA', sport: 'Basketball', season: '2025/26', teams: 30 },
    { id: 6, name: 'Rugby Championship', country: 'International', sport: 'Rugby', season: '2025', teams: 4 },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    league.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leagues</h1>
          <p className="text-gray-500 text-sm mt-1">Manage leagues and competitions</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-dark">
          <Plus size={16} />
          Add League
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search leagues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-5 font-medium text-gray-500">League</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Country</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Sport</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Season</th>
                <th className="text-center py-3 px-5 font-medium text-gray-500">Teams</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeagues.map((league) => (
                <tr key={league.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-5 font-medium text-gray-900">{league.name}</td>
                  <td className="py-3 px-5 text-gray-600">{league.country}</td>
                  <td className="py-3 px-5">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {league.sport}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-gray-600">{league.season}</td>
                  <td className="py-3 px-5 text-center text-gray-600">{league.teams}</td>
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

export default AdminLeagues
