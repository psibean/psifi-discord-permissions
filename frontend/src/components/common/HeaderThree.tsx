import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
  return <h3 className="font-medium text-md md:text-xl mb-4 pt-1">{ children }</h3>
}