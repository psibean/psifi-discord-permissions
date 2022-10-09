import classnames from "classnames";
import { Link, useMatch } from "react-router-dom"
import { SubMenuItem } from "./SubMenu"


export default ({ label, path }: SubMenuItem) => {
  const selected = useMatch(path);
  return (<li>
    <Link
      to={path}
      className={classnames(
        "block border-l pl-4 -ml-px",
        !selected && "border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300",
        selected && "text-sky-500 border-current font-semibold dark:text-sky-400"
      )}>
      { label }
    </Link>
  </li>)
}