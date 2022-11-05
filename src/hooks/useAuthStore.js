import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {
 
    const dispatch = useDispatch();
    //en el state tenemos
    const { status, user,  errorMessage } = useSelector( state => state.auth);

    const starLogin = async({email, password})=>{

        //ponemos el estado de la aplicacion en checking
        dispatch(onChecking());

        try{
            const {data} = await calendarApi.post('/auth/', { email, password } );
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({name: data.name, uid: data.uid}));

        }catch (error) {
            dispatch( onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                //quitamos el error de la pantalla
                dispatch( clearErrorMessage());
            }, 10);
        }
    }

    const starRegister = async ({ registerName, registerEmail, registerPassword, registerPassword2 }) => {
        dispatch( onChecking());
        
        try {
           const { data}  = await calendarApi.post('/auth/new',{ email: registerEmail, password: registerPassword, name: registerName });
          
           localStorage.setItem('token', data.token );
           localStorage.setItem('token-init-date', new Date().getTime());
           dispatch( onLogin({name: data.name, uid: data.uid}));


        }catch(error) {
            console.log(error.response.data);
            dispatch( onLogout(error.response.data?.msg));
            setTimeout(() => {
                //quitamos el error de la pantalla
                dispatch( clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        //comparamos que el toeken exista, sino cerramos la sesion
        if( !token ) return dispatch(onLogout());

        try{

          const { data }= await calendarApi.get('/auth/renew');
          console.log( data );
          localStorage.setItem('token', data.token );
          localStorage.setItem('token-init-date', new Date().getTime());
          dispatch( onLogin({name: data.name, uid: data.uid}));

        }catch(error ){
            //limpiamos el localstorage
            localStorage.clear();
            console.log(error);
            dispatch(  onLogout());
        }
    }

    return {
        //* Properties

        status,
        user,
        errorMessage,

        //* Methods 
        checkAuthToken,
        starLogin,
        starRegister
    }
}