import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        modalOpen: (state, action) => {
            //Este codigo es valido para redux toolkit, para redux normal NO
            state.isDateModalOpen = true
        },
        onCloseModal : (state, action) => {
            //Este codigo solo es valido para redux toolkit
            state.isDateModalOpen = false;
        }
    }
});
export const { modalOpen, onCloseModal } =  uiSlice.actions;