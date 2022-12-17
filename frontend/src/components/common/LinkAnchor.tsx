import { Link, LinkProps } from "react-router-dom";

export default ({ children, ...rest }: LinkProps ) => {
  return <Link className="text-blue-200 visited:text-purple-200 hover:underline decoration-solid" { ...rest }>{ children }</Link>
  
}