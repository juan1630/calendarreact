import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


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


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events:[],
        activateEvent : null
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
                if( event._id == payload.id) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if( state.activateEvent ){
                state.events = state.events.filter( event => event._id !== state.activateEvent._id );
                state.activateEvent = null; 
            }
        }
    }
});
export const { onSetActivateNote, onAddNewEvent, onUpdateEvent, onDeleteEvent } =  calendarSlice.actions;