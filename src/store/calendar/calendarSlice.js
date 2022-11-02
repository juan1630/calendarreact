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
        events:[
            tempEvent
        ],
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
        }
    }
});
export const { onSetActivateNote, onAddNewEvent } =  calendarSlice.actions;