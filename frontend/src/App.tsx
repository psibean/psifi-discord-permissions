import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Account from './pages/dashboard/Account'
import ChannelPermissionOverwrites from './pages/dashboard/ChannelPermissionOverwrites'
import Guild from './pages/dashboard/Guild'
import GuildInviteRedirectHandler from './pages/dashboard/GuildInviteRedirectHandler'
import Guilds from './pages/dashboard/Guilds'
import Settings from './pages/dashboard/Settings'
import DiscordLogin from './pages/DiscordLogin'
import Home from './pages/Home'
import { CLIENT_ROUTES } from './util/constants'

const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.AUTH.LOGIN,
    element: <DiscordLogin />
  },
  {
    path: CLIENT_ROUTES.DASHBOARD.ROOT,
    element: <Dashboard />,
    children: [
      {
        path: CLIENT_ROUTES.DASHBOARD.GUILD,
        element: <Guild />
      },
      {
        path: CLIENT_ROUTES.DASHBOARD.GUILDS,
        element: <Guilds />
      },
    ]
  },
  {
    path: CLIENT_ROUTES.AUTH.GUILD_INVITE,
    element: <GuildInviteRedirectHandler />
  },
  {
    path: CLIENT_ROUTES.ROOT,
    element: <Home />
  }
])

function App() {
  return <div className='flex flex-row flex-start min-h-screen max-h-screen h-screen w-screen box-border overflow-hidden'>
    <RouterProvider router={router} />
  </div>
}

export default App
