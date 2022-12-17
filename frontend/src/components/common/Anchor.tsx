import { PropsWithChildren } from "react";

export default ({ children, target = "blank", ...rest }: JSX.IntrinsicElements['a']) => {
  return <a className="text-blue-200 visited:text-purple-200 hover:underline decoration-solid" target={target} { ...rest }>{ children }</a>
  
}