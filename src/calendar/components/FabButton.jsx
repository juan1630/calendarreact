import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabButton = () => {
    
    const { openDateModal } = useUiStore();
    const { setActivateEvent  } = useCalendarStore();

    const onClickOpenModal = () => {
        //establecemos los valores de la nota activa
        setActivateEvent({
            _id: new Date().getTime(),
            title: '',
            start: new Date(),
            notes: '',
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: 123,
                name: 'Juan'
            }
        })
        //hacemos uso de laa funcio que muestre el modal
        openDateModal();
    }

    return (
        <button 
            className="btn  btn-primary fab"
            onClick={ onClickOpenModal }
        >
            <i className="fas fa-plus" >  </i>
        </button>
        )
};