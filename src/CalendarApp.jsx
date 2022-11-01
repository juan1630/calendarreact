//libs
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//routes
import { AppRouter } from "./routers/AppRouter";

//store
import { store } from "./store";


export const CalendarApp = () => {
    return(
        <Provider store={ store }  >
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    );
};  