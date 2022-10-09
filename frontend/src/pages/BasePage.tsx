import type { PropsWithChildren } from 'react';


export type BasePageProps = PropsWithChildren<{
  title: string;
}>

export default ({ title, children }: BasePageProps) => (
  <div className="flex flex-col flex-grow w-4/5 items-center overflow-y-auto px-4 pt-12">
    <div className="text-4xl font-medium">
      { title }
    </div>
    { children }
  </div>)