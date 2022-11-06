import { useAuthStore } from "../../hooks";

export const NavBar = () => {

     const { startLogOut, user } =  useAuthStore();

     const onLogOut = () =>{
        startLogOut();
     }

    return (<div className="navbar navbar-dark bg-dark mb-4px-4" >
        <span className="navbar-brand" >
            <i className="fas fa-calendar-alt" > </i>
            &nbsp;
            { user.name }
        </span>
        


        <button className="btn btn-outline-danger" onClick={ onLogOut }  >
            <i className="fas fa-sign-out-alt" ></i>
            &nbsp;
            <span>
                Salir
            </span>
        </button>

    </div>)
};