//encragado de las interacciones

import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { converDateToeventsDate } from "../helpers";

import { onAddNewEvent, 
         onDeleteEvent, 
         onSetActivateNote, 
         onSetEvents, 
         onUpdateEvent } 
         
from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

   const dispatch = useDispatch();

   const { events, activateEvent  } = useSelector( state =>  state.calendar )
   const { user } = useSelector( state => state.auth );

   const setActivateEvent = (calendarEvent ) => {
      dispatch( onSetActivateNote( calendarEvent ));
   };

   const startSavingEvent = async( calendarEvent ) => {
      //TODO; LLEGAR AL BACLKEND

      if( calendarEvent._id ) {
         dispatch( onUpdateEvent( calendarEvent ));
      }else {
         //creacion de un nuevo eento.
         const { data} = await calendarApi.post('/events/new',  calendarEvent );
         dispatch( onAddNewEvent({ ...calendarEvent, id: data.eventDB.id , user }))
      }

   };

   const startDeletingEvent = () => {
      dispatch( onDeleteEvent());
   };

   const starLoadingEvents = async() => {
      
      try{

         const { data } = await calendarApi.get('/events');
         const events = converDateToeventsDate( data.events );
         dispatch(onSetEvents( events ));
      }catch (error) {
         console.log(error);

      }
   };

     return {
      //* Properties
        events,
        activateEvent,
        //retornamos si hay laguna nota activa
        hasEventSelected: !!activateEvent,

        //* Methdos
        setActivateEvent,
        startSavingEvent,
        startDeletingEvent,
        starLoadingEvents
     }
};