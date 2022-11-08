import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

/*
const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del wey',
    start: new Date(),
    notes: 'Hay que comprar un pastel',
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: 123,
        name: 'Juan'
    }
  };
*/

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events:[],
        activateEvent : null,
        isLoadingEvents : true
    },
    reducers: {
        onSetActivateNote: (state,  { payload} ) => {
            state.activateEvent = payload;
        },
        onAddNewEvent:  (state, { payload }) => {
            state.events.push( payload );
            state.activateEvent = null;
            //limpiamos la nota activa
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map( event =>  {
                if( event.id == payload.id) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if( state.activateEvent ){
                state.events = state.events.filter( event => event._id !== state.activateEvent.id );
                state.activateEvent = null; 
            }
        },
        onSetEvents : (state, {payload = []}) => {
          //  state.events = payload;
            state.isLoadingEvents = false;

            payload.forEach(event => {

                const exists = state.events.some( dbEvent => dbEvent.id == event.id );
                
                if(!exists) {
                    state.events.push( event );
                }

            });
        },
        onLogoutCalendar:( state ) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activateEvent = null;
        }
    }
});
export const { onSetActivateNote, onAddNewEvent, onUpdateEvent, onDeleteEvent, onSetEvents, onLogoutCalendar } =  calendarSlice.actions;