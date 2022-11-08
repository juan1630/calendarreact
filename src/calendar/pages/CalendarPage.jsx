//libs
import { Calendar } from 'react-big-calendar';

//styles 
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessagesEs  } from '../../helpers'

//compnents
import { NavBar, CalendarEventBox, CalendarModal, FabButton } from "../components";
import { useState } from 'react';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { FabDelete } from '../components/FabDelete';
import { useEffect } from 'react';


  //config de la libreria


export const CalendarPage = () => {

    const { user } = useAuthStore();

    const {  events, setActivateEvent, starLoadingEvents } = useCalendarStore();
    
    const { openDateModal } = useUiStore();
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' );

    //verificamos si es un even to
    
    
    useEffect( ()=> {
        starLoadingEvents();
    },[])
    
    
    const eventStyleGetter = (end, start , event, isSelected) =>{
        
        console.log(event); //devulve solo el inicio del evento
        // const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid );
        const isMyEvent = true;
        const style = {
            backgroundColor: isMyEvent ? '#347CF7': '#465660',
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