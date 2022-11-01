//libs
import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';

//styles 
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessagesEs  } from '../../helpers'

//compnents
import { NavBar, CalendarEventBox, CalendarModal } from "../components";
import { useState } from 'react';

  //config de la libreria

  const events = [{
    title: 'Cumpleaños del wey',
    start: new Date(),
    notes: 'Hay que comprar un pastel',
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: 123,
        name: 'Juan'
    }
  }]


export const CalendarPage = () => {

    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' );

    const eventStyleGetter = (end, start , event, isSelected) =>{

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }


        return { 
            style
        }
        
    };

    const onDoubleClick = (event) =>{
        console.log({ doubleClick: event} );
    };


    const onSelect = (event) =>{
        console.log({ click: event} );
    };

    const onViewChange = (event) =>{
        localStorage.setItem( 'lastView', event );
    };

    return (<> 
            <NavBar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 100px' }}
                messages={ getMessagesEs() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEventBox
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
            />

            <CalendarModal />

        </>)
};