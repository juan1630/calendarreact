//libs
import { Calendar } from 'react-big-calendar';

//styles 
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessagesEs  } from '../../helpers'

//compnents
import { NavBar, CalendarEventBox, CalendarModal, FabButton } from "../components";
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';
import { FabDelete } from '../components/FabDelete';
import { useEffect } from 'react';


  //config de la libreria


export const CalendarPage = () => {

    const {  events, setActivateEvent, starLoadingEvents } = useCalendarStore();

    const { openDateModal } = useUiStore();
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' );

    useEffect( ()=> {
        starLoadingEvents();
    },[])


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
        openDateModal();
    };


    const onSelect = (event) =>{
        setActivateEvent( event );
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

            <FabButton />
            <FabDelete />

        </>)
};