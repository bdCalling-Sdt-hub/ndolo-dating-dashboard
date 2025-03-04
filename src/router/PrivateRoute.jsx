import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useGetProfileQuery } from '../redux/features/profile/profile';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const user =  JSON.parse(localStorage.getItem('user'))
    // const {data: profile, isLoading} = useGetProfileQuery()
 
    
    
    
     if(user){
         return children;
     }
      return <Navigate to="/" state={{from:location}} replace/>
   
};

export default PrivateRoute;