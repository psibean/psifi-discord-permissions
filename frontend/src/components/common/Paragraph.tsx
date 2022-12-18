import classNames from "classnames";
import { PropsWithChildren } from "react";

export type PragraphProps = PropsWithChildren<{
  className?: string;
}>

export default ({ children, className }: PragraphProps) => {
  return <p className={classNames("my-2", className && className )}>{ children }</p>
}