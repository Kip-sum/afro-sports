import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

const AdminTeams = () => {
  const [teams] = useState([
    { id: 1, name: 'Arsenal', shortName: 'ARS', country: 'England', league: 'Premier League', sport: 'Football' },
    { id: 2, name: 'Chelsea', shortName: 'CHE', country: 'England', league: 'Premier League', sport: 'Football' },
    { id: 3, name: 'Manchester City', shortName: 'MCI', country: 'England', league: 'Premier League', sport: 'Football' },
    { id: 4, name: 'Liverpool', shortName: 'LIV', country: 'England', league: 'Premier League', sport: 'Football' },
    { id: 5, name: 'Gor Mahia', shortName: 'Gor Mahia', country: 'Kenya', league: 'Kenya Premier League', sport: 'Football' },
    { id: 6, name: 'AFC Leopards', shortName: 'AFC Leop', country: 'Kenya', league: 'Kenya Premier League', sport: 'Football' },
    { id: 7, name: 'Real Madrid', shortName: 'RMA', country: 'Spain', league: 'La Liga', sport: 'Football' },
    { id: 8, name: 'Barcelona', shortName: 'BAR', country: 'Spain', league: 'La Liga', sport: 'Football' },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.league.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-500 text-sm mt-1">Manage teams in the system</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-dark">
          <Plus size={16} />
          Add Team
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams..."
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
                <th className="text-left py-3 px-5 font-medium text-gray-500">Team</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Short Name</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Country</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">League</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Sport</th>
                <th className="text-left py-3 px-5 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => (
                <tr key={team.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                        {team.shortName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{team.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-gray-600">{team.shortName}</td>
                  <td className="py-3 px-5 text-gray-600">{team.country}</td>
                  <td className="py-3 px-5 text-gray-600">{team.league}</td>
                  <td className="py-3 px-5">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {team.sport}
                    </span>
                  </td>
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

export default AdminTeams
