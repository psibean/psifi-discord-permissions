import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
  return <p className="my-2">{ children }</p>
}