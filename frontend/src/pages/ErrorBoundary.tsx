import { useRouteError } from "react-router-dom"
import HeaderOne from "../components/common/HeaderOne";
import Paragraph from "../components/common/Paragraph";
import LogoutButton from "../components/dashboard/Navigation/LogoutButton";

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
      <Paragraph>
        If this error keeps happening, try logging out and back in.
      </Paragraph>
      <LogoutButton />
    </div>
  )
}