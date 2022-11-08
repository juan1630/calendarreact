//encragado de las interacciones

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { converDateToeventsDate } from "../helpers";

import { onAddNewEvent, 
         onDeleteEvent, 
         onSetActivateNote, 
         onSetEvents, 
         onUpdateEvent 
      } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

   const dispatch = useDispatch();

   const { events, activateEvent  } = useSelector( state =>  state.calendar )
   const { user } = useSelector( state => state.auth );

   const setActivateEvent = (calendarEvent ) => {
      dispatch( onSetActivateNote( calendarEvent ));
   };

   const startSavingEvent = async( calendarEvent ) => {
      //TODO; LLEGAR AL BACLKEND

      try{

         if( calendarEvent.id ) {
            //actualizamos el evento
            const {data }  = await calendarApi.put(`/events/update/${calendarEvent.id}`, calendarEvent );
            dispatch( onUpdateEvent({...calendarEvent, user}));
            return;
         }else {
            //creacion de un nuevo eento.
            const { data} = await calendarApi.post('/events/new',  calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.eventDB.id , user }))
         }
         
      }catch(error) {
         console.error(error);
         Swal.fire('Error al guardar',error.response.msg , 'error')
      }

   };

   const startDeletingEvent = async () => {
      // dispatch( onDeleteEvent());

      try {
         
         console.log( activateEvent );
         const { data } = await calendarApi.delete(`/events/delete/${ activateEvent.id }`); 
         console.log( data  );
         // Swal.fire('Se elimino el evento', 'Eliminado','success');
         dispatch( onDeleteEvent());
      } catch (error) {
         console.log(error);
         const { response  } = error
         Swal.fire(`${response.data.msg}`, 'hubo un error','error');
      }
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