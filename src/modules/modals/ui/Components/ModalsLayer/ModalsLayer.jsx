import { ModalTypes, modalsActions } from 'modules/modals/store/modalsSlice.js';
import React from 'react';
import { useSelector } from 'react-redux';
import ModalOfferToAuthorize from '../Modals/ModalOfferToAuthorize/ModalOfferToAuthorize.jsx';
import ModalAwareness from '../Modals/ModalAwareness/ModalAwareness.jsx';
import { useDispatch } from 'react-redux';
import { ClosingAnimationDelta } from 'modules/modals/domain/config.js';
import ModalAlert from '../Modals/ModalAlert/ModalAlert.jsx';

const ModalsLayer = () => {
    const dispatch = useDispatch();
    const { isOpen, currentModalType, isShowingClosingAnimation, modalParams } =
        useSelector(state => state.modals.data);

    const hideModal = () => {
        dispatch(modalsActions.setData({ isShowingClosingAnimation: true }));

        setTimeout(() => {
            dispatch(
                modalsActions.setData({
                    isOpen: false,
                    currentModalType: null,
                    isShowingClosingAnimation: false,
                })
            );
        }, ClosingAnimationDelta);
    };

    if (isOpen) {
        const commonProps = {
            closingAnimation: isShowingClosingAnimation,
            onHideCart: hideModal,
            ...modalParams,
        };
        switch (currentModalType) {
            case ModalTypes.Auth:
                return <ModalOfferToAuthorize {...commonProps} />;
            case ModalTypes.Awareness:
                return <ModalAwareness {...commonProps} />;
            case ModalTypes.AlertModal:
                return <ModalAlert {...commonProps} />;
            default:
                return <></>;
        }
    }

    return <></>;
};

export default ModalsLayer;
