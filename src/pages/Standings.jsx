import { Trophy, BarChart3 } from 'lucide-react'

const Standings = () => {
  const standings = [
    {
      team: { id: 1, name: 'Gor Mahia', shortName: 'Gor Mahia', logo: null },
      played: 24,
      won: 16,
      drawn: 5,
      lost: 3,
      goalsFor: 38,
      goalsAgainst: 18,
      goalDiff: 20,
      points: 53,
    },
    {
      team: { id: 2, name: 'TP Mazembe', shortName: 'TP Mazembe', logo: null },
      played: 24,
      won: 15,
      drawn: 4,
      lost: 5,
      goalsFor: 42,
      goalsAgainst: 22,
      goalDiff: 20,
      points: 49,
    },
    {
      team: { id: 3, name: 'AFC Leopards', shortName: 'AFC Leopards', logo: null },
      played: 24,
      won: 12,
      drawn: 6,
      lost: 6,
      goalsFor: 31,
      goalsAgainst: 26,
      goalDiff: 5,
      points: 42,
    },
    {
      team: { id: 4, name: 'Al Ahly', shortName: 'Al Ahly', logo: null },
      played: 24,
      won: 11,
      drawn: 7,
      lost: 6,
      goalsFor: 29,
      goalsAgainst: 24,
      goalDiff: 5,
      points: 40,
    },
  ]

  const leagues = [
    { id: 'kpl', name: 'Kenya Premier League' },
    { id: 'premier-league', name: 'Premier League' },
    { id: 'champions-league', name: 'Champions League' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Standings</h1>
        <select className="border border-gray-300 rounded px-3 py-2 text-sm">
          <option>Select League</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b flex items-center gap-2">
          <Trophy size={20} className="text-gold" />
          <h2 className="font-bold">Kenya Premier League</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">#</th>
                <th className="text-left py-3 px-4">Team</th>
                <th className="text-center py-3 px-4">P</th>
                <th className="text-center py-3 px-4">W</th>
                <th className="text-center py-3 px-4">D</th>
                <th className="text-center py-3 px-4">L</th>
                <th className="text-center py-3 px-4">GF</th>
                <th className="text-center py-3 px-4">GA</th>
                <th className="text-center py-3 px-4">GD</th>
                <th className="text-center py-3 px-4 font-bold">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={team.team?.id || index} className={index < 4 ? 'bg-primary/5' : ''}>
                  <td className="py-3 px-4">
                    {index < 4 ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={team.team?.logo || '/placeholder-logo.svg'}
                        alt={team.team?.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => (e.target.src = '/placeholder-logo.svg')}
                      />
                      {team.team?.shortName || team.team?.name || '-'}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{team.played}</td>
                  <td className="py-3 px-4 text-center">{team.won}</td>
                  <td className="py-3 px-4 text-center">{team.drawn}</td>
                  <td className="py-3 px-4 text-center">{team.lost}</td>
                  <td className="py-3 px-4 text-center">{team.goalsFor}</td>
                  <td className="py-3 px-4 text-center">{team.goalsAgainst}</td>
                  <td className="py-3 px-4 text-center">{team.goalDiff}</td>
                  <td className="py-3 px-4 text-center font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={20} className="text-primary" />
          <h2 className="font-bold text-lg">Top Scorers</h2>
        </div>
        <div className="space-y-2">
          {standings.slice(0, 5).map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-bold">{index + 1}</span>
                <span className="font-medium">Player Name</span>
              </div>
              <span className="text-sm text-gray-600">5 goals</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Standings
