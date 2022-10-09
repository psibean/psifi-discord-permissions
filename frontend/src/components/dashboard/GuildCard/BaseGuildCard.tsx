import type { PropsWithChildren } from 'react';
import { ListedGuild } from "../../../../../psd-types/src/types";


export type BaseGuildCardProps = PropsWithChildren<{
  guild: ListedGuild;
}>


export default ({ guild, children }: BaseGuildCardProps) => {

  // const handleInviteClick = (event: MouseEvent) => {
  //   event.preventDefault();
  //   const popupWindow = window.open(guildInviteUrl, "Invite Psifi", 'width=500,height=850');
  // }

  return (
      <div 
        title={guild.name}
        className="rounded-xl overflow-hidden m-6 border border-slate-400 dark:border-slate-500 overflow-hidden"
      >
        <div className="flex w-full h-32 border-slate-400 dark:border-slate-500 border-b relative overflow-hidden mb-4">
          <div className="w-full h-32 absolute scale-150 blur-md top-0 z-10 overflow-hidden opacity-30" style={{
            backgroundImage: `url("${guild.icon ?? ''}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundColor: `rgb(31, 33, 41)`
          }}>
          </div>
          <div className="flex items-center justify-center w-20 h-20 border m-auto rounded-full z-20 overflow-hidden">
            { 
            guild.icon ?
              <img className="w-full" src={guild.icon}/>
              :
              <div className="text-2xl font-extrabold">{guild.nameAcronym}</div>
            }
          </div>
        </div>
        <div className="mx-4 mb-4 flex flex-row justify-between align-center content-center items-center">
          <div>
          <h5 className="block not-prose w-56 max-h-16 self-center text-ellipsis overflow-hidden text-wrap relative text-xl mr-4 font-semibold text-slate-900 dark:text-slate-200">
            {guild.name}
          </h5>
          </div>
          { children }
        </div>
      </div>
  )
}