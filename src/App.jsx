import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import Live from './pages/Live'
import Football from './pages/Football'
import Basketball from './pages/Basketball'
import Rugby from './pages/Rugby'
import Athletics from './pages/Athletics'
import News from './pages/News'
import MatchDetails from './pages/MatchDetails'
import TeamDetails from './pages/TeamDetails'
import LeagueDetails from './pages/LeagueDetails'
import Teams from './pages/Teams'
import Leagues from './pages/Leagues'
import Standings from './pages/Standings'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/Dashboard'
import AdminNews from './pages/admin/NewsManagement'
import AdminNewsEditor from './pages/admin/NewsEditor'
import AdminTeams from './pages/admin/TeamsManagement'
import AdminLeagues from './pages/admin/LeaguesManagement'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="live" element={<Live />} />
            <Route path="football" element={<Football />} />
            <Route path="basketball" element={<Basketball />} />
            <Route path="rugby" element={<Rugby />} />
            <Route path="athletics" element={<Athletics />} />
            <Route path="news" element={<News />} />
            <Route path="news/:slug" element={<News />} />
            <Route path="matches/:id" element={<MatchDetails />} />
            <Route path="teams" element={<Teams />} />
            <Route path="teams/:id" element={<TeamDetails />} />
            <Route path="leagues" element={<Leagues />} />
            <Route path="leagues/:id" element={<LeagueDetails />} />
            <Route path="standings" element={<Standings />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="news/new" element={<AdminNewsEditor />} />
            <Route path="news/:id" element={<AdminNewsEditor />} />
            <Route path="teams" element={<AdminTeams />} />
            <Route path="leagues" element={<AdminLeagues />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
