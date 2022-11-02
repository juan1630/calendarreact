//encragado de las interacciones

import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActivateNote } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

   const dispatch = useDispatch();
   const { events, activateEvent  } = useSelector( state =>  state.calendar )


   const setActivateEvent = (calendarEvent ) => {
      dispatch( onSetActivateNote( calendarEvent ));
   };

   const startSavingEvent = async( calendarEvent ) => {
      //TODO; LLEGAR AL BACLKEND

      //todo bien 

      if( calendarEvent._id ) {
         //algo
      }else {
         dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime()  }))
      }

   };

     return {
      //* Properties
        events,
        activateEvent,

        //* Methdos
        setActivateEvent,
        startSavingEvent
     }
};