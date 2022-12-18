import { useRouteError } from "react-router-dom"
import HeaderOne from "../components/common/HeaderOne";
import Paragraph from "../components/common/Paragraph";

export default () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <HeaderOne>
        BIG ERROR NONO: PAGE WIP
      </HeaderOne>
      <Paragraph>
        { error instanceof Error && error.message }
        { typeof error === 'string' && error }
        { !(error instanceof Error) && typeof error !== 'string' && "Check the console for error information."}
        </Paragraph>
    </div>
  )
}