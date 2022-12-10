import { PropsWithChildren } from "react";

export const BaseSimulatorPageHeader = ({ children }: PropsWithChildren) => {
  return <div className="bg-white border-b border-slate-300 dark:border-slate-700 dark:bg-slate-900 py-2 font-bold text-center text-3xl">
    { children }
  </div>
}

export const BaseSimulatorPageBody = ({ children }: PropsWithChildren) => {
  return <div className="w-full scrollbar-base grow box-border overflow-y-auto pt-2 last:border-none">
    { children }
  </div>
}

export const BaseSimulatorPageContainer = ({ children }: PropsWithChildren) => {
  return (<div className="flex flex-col w-full h-full box-border overflow-hidden">
    { children }
    </div>)
}