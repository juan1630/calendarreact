import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks";

export const AppRouter = () =>{

   // const loginStatus = 'not-authenticated';
    const { checkAuthToken, status } = useAuthStore();

    useEffect( ()=> {
        checkAuthToken();
    }, []);

    if(  status === 'checking' ){
        return <h2> Cargando... </h2> 
    }   

    return(
        <Routes>

                {
                    ( status === 'not-authenticated' )
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage /> } />
                            <Route path="/*" element={<Navigate to='/auth/login' /> } />
                        </>
                        )
                    :  (
                        <>
                            {/*
                                La ruta prinipal es el "/" 
                            */}
                             <Route path="/" element={<CalendarPage /> } />
                            <Route path="/*" element={<Navigate to='/' /> } />
                            {/*
                                Cualquier ruta que no coincida, se manda a la ruta principal
                            */}
                        </>

                    )
                }
                
        </Routes>
    );
};