import { useNavigate, useParams } from "react-router-dom"
import { SideNavigation } from '../components/dashboard/Navigation/SideNavigation';
import { fetchUserData } from '../util/api';
import { useProfile } from '../state/user.slice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { InternalOAuthProfile } from '../../../psd-types/src/types';
import { useGuild } from "../state/selectedGuild.slice";
import Loading from "../components/util/Loading";
import RequestError from "../util/RequestError";

export type DashboardProps = {
  oauthUser?: InternalOAuthProfile;
}

export default () => {
  const navigate = useNavigate();
  const profile = useProfile();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(profile === null);

  useEffect(() => {
    if (isLoading) {
        fetchUserData(dispatch).then(() => {
          setIsLoading(false);
      }).catch(error => {
        if (error instanceof RequestError && error.code === 401) {
          navigate("/");   
        } else {
          setIsLoading(false);
        }
      });
    }
  }, [])
  
  if (!isLoading && profile === null)
    navigate("/");
  
  if (isLoading)
    return <Loading text="Loading..." /> 
    
  return <div className='flex flex-row flex-start min-h-screen max-h-screen h-screen w-screen box-border overflow-hidden'>
    <SideNavigation />
    <Outlet />
  </div>
}