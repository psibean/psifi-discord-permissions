import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
  return <li className="my-2">{ children }</li>
}