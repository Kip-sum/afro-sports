import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'
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
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
