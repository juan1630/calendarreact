import { useDispatch, useSelector } from "react-redux";

import {  modalOpen, onCloseModal } from '../store'

export const useUiStore = () => {
  
  const dispatch = useDispatch(); 

  const {
    isDateModalOpen
  } = useSelector( state => state.ui );


  const openDateModal = () =>{
      dispatch( modalOpen());
  }

  const closeDateModal = () => {

    dispatch( onCloseModal() );
  }

  return {
    
    //*Properties
    isDateModalOpen,
    
    //*Methods
    openDateModal,
    closeDateModal
  }

};