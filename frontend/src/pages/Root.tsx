import { CLIENT_ROUTES, PSD_API_URL } from '../util/constants.js';
import { SiDiscord } from 'react-icons/si';
import { Link, Outlet } from 'react-router-dom';
import classnames from 'classnames';

type HomeNavLinkProps = {
  to: string;
  label: string;
  selected?: boolean;
}

const HomeNavLink = ({ label, to, selected }: HomeNavLinkProps) => {
  return (
    <Link
      className={classnames(
        "block border-b mx-2 px-1 border-slate-900/10 dark:border-slate-300/10",
        !selected && "hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300",
        selected && "text-sky-500 border-current font-semibold dark:text-sky-400"
      )}
      to={to}
    >
      {label}
    </Link>
  )
}

export default () => {
  return <div className='flex flex-col flex-start min-h-screen max-h-screen h-screen w-screen box-border overflow-hidden'>
  <div className="w-full text-2xl flex flex-row justify-between items-center align-center p-4 mb-2">
    <div>
      Psifi Security: Permissions Simulator
    </div>
    <div className="flex flex-row">
      <HomeNavLink to={CLIENT_ROUTES.ROOT} label="Home" />
      <HomeNavLink to={CLIENT_ROUTES.TOS} label="Terms of Service" />  
      <HomeNavLink to={CLIENT_ROUTES.PRIVACY} label="Privacy Policy" />
    </div>
  </div>
    <div className="container mx-auto px-4">
      <Outlet />
    </div>
  </div>
}