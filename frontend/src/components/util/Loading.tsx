import { CgSpinnerTwo } from 'react-icons/cg';

export type LoadingProps = {
  text?: string;
}

export default ({ text }: LoadingProps) => {
  return (<div className="m-auto">
    <CgSpinnerTwo className='w-32 h-32 animate-spin m-auto' />
    {text && <div>{text}</div>}
  </div>)
}