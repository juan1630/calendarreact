//encragado de las interacciones

import { useDispatch, useSelector } from "react-redux";
import { onSetActivateNote } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

   const dispatch = useDispatch();
   const { events, activateEvent  } = useSelector( state =>  state.calendar )


   const setActivateEvent = (calendarEvent ) => {
      dispatch( onSetActivateNote( calendarEvent ));
   };


     return {
      //* Properties
        events,
        activateEvent,

        //* Methdos
        setActivateEvent
     }
};