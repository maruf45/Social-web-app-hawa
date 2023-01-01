import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../../Context/AuthContext/AuthContext';
import Loader from '../Loader/Loader';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthProvider);
    const locations = useLocation();

    if(loading){
        return <Loader/>
    }

    if(user?.uid){
        return children;
    }

    return (
        <Navigate to={'/sign-up'} state={{from: locations}} replace/>
    );
};

export default PrivateRoute;