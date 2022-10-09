import { useState } from "react";
import { Navigate } from "react-router-dom";
import { authenticatedPost } from "../../../util/api.js"

export default () => {
  
  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    authenticatedPost('/auth/logout').then(() => {
      setLoggedOut(true);
    });
  }

  if (loggedOut) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full text-center mt-8 ">
    <button className="px-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-sm shadow-sm" onClick={logout}>Logout</button>
    </div>
  )
}