import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Guild from './pages/dashboard/Guild'
import GuildInviteRedirectHandler from './pages/dashboard/GuildInviteRedirectHandler'
import Guilds from './pages/dashboard/Guilds'
import DiscordLogin from './pages/DiscordLogin'
import Home from './pages/home/Home'
import PrivacyPolicy from './pages/home/PrivacyPolicy'
import Security from './pages/home/Security'
import TermsOfService from './pages/home/TermsOfService'
import Root from './pages/Root'
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
    element: <Root />,
    children: [
      {
        path: CLIENT_ROUTES.TOS,
        element: <TermsOfService />
      },
      {
        path: CLIENT_ROUTES.PRIVACY,
        element: <PrivacyPolicy />
      },
      {
        path: CLIENT_ROUTES.SECURITY,
        element: <Security />
      },
      {
        path: CLIENT_ROUTES.ROOT,
        element: <Home />
      }
    ]
  }
])

function App() {
  return <div className='flex flex-row flex-start min-h-screen max-h-screen h-screen w-screen box-border overflow-hidden'>
    <RouterProvider router={router} />
  </div>
}

export default App
