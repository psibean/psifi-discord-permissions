import type { PropsWithChildren } from 'react';
import HeaderOne from '../components/common/HeaderOne';


export type BasePageProps = PropsWithChildren<{
  title: string;
}>

export default ({ title, children }: BasePageProps) => (
  <div className="flex flex-col flex-grow w-4/5 items-center overflow-y-auto px-4 pt-12">
    <HeaderOne>
      { title }
    </HeaderOne>
    { children }
  </div>)