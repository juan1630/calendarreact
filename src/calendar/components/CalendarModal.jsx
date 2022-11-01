//hooks
import { useMemo, useState } from 'react';
import { useCalendarStore, useUiStore  } from '../../hooks/index';

//libs
import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import Swal from 'sweetalert2';

import es from 'date-fns/locale/es';




//CSS
import "react-datepicker/dist/react-datepicker.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useEffect } from 'react';

registerLocale('es', es);


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { activateEvent } = useCalendarStore();
    const [ formSubmited, setFormSubmited ] = useState(false);

    const [formValues, setFormValues] = useState({
        title:'Juan',
        notes: "patron",
        start: new Date(),
        end:   addHours( new Date(), 2 )
    });

    const titleClass = useMemo(()=>{
        if(!formSubmited) return '';

        return( formValues.title.length > 0 )
        ? 'is-valid'
        : 'is-invalid'
    
    }, [ formValues.title, formSubmited ]);


    useEffect( () => {
        if( activateEvent !== null ) {
            setFormValues({...activateEvent});
        }
    }, [activateEvent]);

    const { isDateModalOpen, closeDateModal  } = useUiStore();
    
    const onCloseModal = () => {
        closeDateModal();

    };

      const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]:target.value
        });
    }


    const onDateChange = ( event, changing = '' ) => {
            setFormValues({
                ...formValues,
                [changing]: event
            })
    };
    
    //envio del formulario

    const onsubmit = (event) => {
        event.preventDefault();

        setFormSubmited( true );

        const diference = differenceInSeconds( formValues.end, formValues.start );
        
        if( isNaN( diference ) || diference <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas', 'error');
            return;
        }

        if( formValues.title.length <= 3 ) return
        //mensaje de error del titulo

        
        //TODO: CERRAR MODAL
        //TODO: REMOVER ERRORES DE PANTALLA
    };

    return(
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
    >   

        <h1> Nuevo evento </h1>
        <hr />
        <form className="container"  onSubmit={onsubmit} >

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                    <DatePicker 
                    minDate={ formValues.start }
                        selected={ formValues.start }
                        className='form-control'
                        onChange={ event => onDateChange(event, 'start') }
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker 
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        className='form-control'
                        onChange={ event => onDateChange(event, 'end') }
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={ 'form-control '+ titleClass }
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    onChange={onInputChange}
                    value={ formValues.title }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    onChange={onInputChange}
                    value={ formValues.notes } 
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>

    </Modal>
    )
};  