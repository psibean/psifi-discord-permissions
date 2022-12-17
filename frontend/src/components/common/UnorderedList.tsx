import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
  return <ul className="ml-12 list-disc list-outside">{ children }</ul>
}