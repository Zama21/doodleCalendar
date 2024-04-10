import React from 'react';
import Modal from '../Modal/Modal';
import stl from './ModalTwoBtn.module.css';

export default function ModalTwoBtn({
    title,
    text,
    btnAgreeText,
    btnDisagreeText,
    handleAgree,
    handleDisagree,
    closingAnimation,
    animationDuration,
}) {
    return (
        <Modal
            onHideCart={handleDisagree}
            closingAnimation={closingAnimation}
            animationDuration={animationDuration}
        >
            <h2 className={stl.title}>{title}</h2>
            <div className={stl.content}>{text}</div>
            <div className={stl.wrapperBtn}>
                <button className={`${stl.btnDisagree} ${stl.btn}`} onClick={handleDisagree}>
                    {btnDisagreeText}
                </button>
                <button className={`${stl.btnAgree} ${stl.btn}`} onClick={handleAgree}>
                    {btnAgreeText}
                </button>
            </div>
        </Modal>
    );
}
