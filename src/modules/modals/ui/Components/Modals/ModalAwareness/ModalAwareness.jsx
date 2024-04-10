import React from 'react';
import stl from './ModalAwareness.module.css';
import Modal from 'modules/modals/ui/Components/Modals/BaseModals/Modal/Modal.jsx';

export default function ModalAwareness({ title, text, btnText, ...otherProps }) {
    return (
        <Modal {...otherProps}>
            <h2 className={stl.title}>{title}</h2>
            <div className={stl.content}>{text}</div>
            <button className={stl.btnYes} onClick={otherProps.onHideCart}>
                {btnText}
            </button>
        </Modal>
    );
}
