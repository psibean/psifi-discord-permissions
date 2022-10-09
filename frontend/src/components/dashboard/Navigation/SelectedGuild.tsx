import classNames from "classnames";
import { Link, useMatch } from "react-router-dom";
import { useGuild } from "../../../state/selectedGuild.slice"

export default () => {
  const guild = useGuild();
  const path = "/dashboard/guilds";
  const selected = useMatch(path);

  const renderGuildLink = () => {
    return (
      <>
        { guild?.icon &&
          <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
            <img width="100%" src={guild.icon}/>
          </div>
        }
        <div className="my-auto ">
          {guild?.name}
        </div>
      </>
    )
  }

  const renderNoGuildLink = () => {
    return (
      <p>Please select a server.</p>
    )
  }

  console.log("Rendering Selected Guild...");
  return (
    <>
    <div className="text-sm ml-6 -mb-1">
      Select a server:
    </div>    
    <Link
    className={classNames(
      "border rounded-md p-2 mx-4 mt-2 min-w-fit block",
      selected && "text-sky-500 border-current font-semibold dark:text-sky-400 ",
      !selected && "border-transparent border-slate-100 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300")} to="/dashboard/guilds">
      <div className={classNames(
        "flex flex-row")}>
        {
          guild ? renderGuildLink() : renderNoGuildLink()
        } 
      </div>
    </Link>
    </>
  )
}