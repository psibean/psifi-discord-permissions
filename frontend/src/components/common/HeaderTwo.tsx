import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
  return <h2 className="font-semibold text-xl md:text-2xl mb-4 pt-1">{ children }</h2>
}