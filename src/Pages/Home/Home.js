import React, { useContext } from 'react';
import Loader from '../../Components/Loader/Loader';
import { AuthProvider } from '../../Context/AuthContext/AuthContext';

const Home = () => {
    const {loading} = useContext(AuthProvider);
    if(loading){
        return <Loader/>
    }
    return (
        <>
         <h1>welcome post</h1>   
        </>
    );
};

export default Home;