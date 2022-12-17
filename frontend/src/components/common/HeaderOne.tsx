import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
  return <h1 className="font-bold md:text-4xl text-2xl mb-4 pt-4">{ children }</h1>
}