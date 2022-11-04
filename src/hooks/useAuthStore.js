import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";

export const useAuthStore = () => {
 
    const dispatch = useDispatch();
    //en el state tenemos
    const { status, user,  errorMessage } = useSelector( state => state.auth);

    const starLogin = async({email, password})=>{
        try{

            const resp = await calendarApi.post('/auth/', { email, password } );
            console.log( resp );

        }catch (error) {
            console.log(error);
        }
    }

    return {
        //* Properties

        status,
        user,
        errorMessage,

        //* Methods 
        starLogin
    }
}