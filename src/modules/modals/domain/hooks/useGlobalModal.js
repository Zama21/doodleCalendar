import { modalsActions } from 'modules/modals/store/modalsSlice.js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ClosingAnimationDelta } from '../config.js';

export const useGlobalModal = modalType => {
    const dispatch = useDispatch();
    const { isOpen, currentModalType } = useSelector(state => state.modals.data);

    return {
        open(params) {
            if (isOpen) return; // какая-то модалка уже открыта
            dispatch(
                modalsActions.setData({
                    isOpen: true,
                    modalParams: params ?? {},
                    currentModalType: modalType,
                })
            );
        },
        close() {
            if (!isOpen || currentModalType !== modalType) return; // модалка закрыта или открыта другая
            dispatch(modalsActions.setData({ isShowingClosingAnimation: true }));

            setTimeout(() => {
                dispatch(
                    modalsActions.setData({
                        isOpen: false,
                        currentModalType: null,
                        isShowingClosingAnimation: false,
                        modalParams: {},
                    })
                );
            }, ClosingAnimationDelta);
        },
    };
};
