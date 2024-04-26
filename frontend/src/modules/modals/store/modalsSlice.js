import { createSlice } from '@reduxjs/toolkit';

export const ModalTypes = {
    Auth: 'auth',
    Awareness: 'awareness',
    AlertModal: 'alert',
};

export const modalsSlice = createSlice({
    name: 'modals',
    initialState: {
        data: {
            isOpen: false,
            isShowingClosingAnimation: false,
            currentModalType: null,
            modalParams: {},
        },
    },
    reducers: {
        setData(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
    },
});

export const { actions: modalsActions } = modalsSlice;
export const { reducer: modalsReducer } = modalsSlice;
