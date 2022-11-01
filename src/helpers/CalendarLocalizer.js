import {  dateFnsLocalizer } from 'react-big-calendar';
import {  parse, format, startOfWeek, getDay } from 'date-fns';

//config 
import enES from 'date-fns/locale/es';


const locales = {
    'es': enES,
  }
  
  export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  });
