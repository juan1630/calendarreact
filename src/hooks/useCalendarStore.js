//encragado de las interacciones

import { useDispatch, useSelector } from "react-redux";

import { onAddNewEvent, 
         onDeleteEvent, 
         onSetActivateNote, 
         onUpdateEvent } 
         
from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

   const dispatch = useDispatch();
   const { events, activateEvent  } = useSelector( state =>  state.calendar )


   const setActivateEvent = (calendarEvent ) => {
      dispatch( onSetActivateNote( calendarEvent ));
   };

   const startSavingEvent = async( calendarEvent ) => {
      //TODO; LLEGAR AL BACLKEND

      if( calendarEvent._id ) {
         dispatch( onUpdateEvent( calendarEvent ));
      }else {
         dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime()  }))
      }

   };

   const startDeletingEvent = () => {
      dispatch( onDeleteEvent());
   }

     return {
      //* Properties
        events,
        activateEvent,
        //retornamos si hay laguna nota activa
        hasEventSelected: !!activateEvent,

        //* Methdos
        setActivateEvent,
        startSavingEvent,
        startDeletingEvent
     }
};