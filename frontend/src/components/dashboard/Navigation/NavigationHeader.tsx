import { useProfile } from "../../../state/user.slice.js";
import type { InternalOAuthProfile } from "../../../../../psd-types/src/types";
import classNames from "classnames";


export default () => {
  const profile = useProfile() as InternalOAuthProfile;
  
  return (<div className="w-full mb-4">
    <div className={classNames("w-60 border-b border-slate-900/10 dark:border-slate-300/10", !profile.banner && "h-24")}>
      { profile.banner && <img className="w-full" src={profile.banner} />}
    </div>
    <div className="overflow-hidden mb-4 box-content rounded-full w-24 h-24 mx-auto -mt-14 border-b border-slate-900/10 dark:border-slate-300/10">
      <img width="100%" src={profile.avatar ?? ''} />
    </div>
    <div className="w-full text-center font-semibold text-slate-900 dark:text-slate-200">
       Welcome, {profile.displayName}!
    </div>
  </div>)
}