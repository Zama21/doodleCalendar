import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { ClosingAnimationDelta } from 'modules/modals/domain/config.js';

const Backdrop = props => {
    const [scrollY, setScrollY] = useState(window.scrollY);

    useEffect(() => {
        // const scrollY = window.scrollY;

        // document.body.style.overflow = 'hidden';
        // document.body.style.height = '100vh';
        // document.body.style.minHeight = 'auto';

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.paddingRight = `16px`;

        return () => {
            // document.body.style.overflow = 'auto';
            // document.body.style.minHeight = '100%';
            // document.body.style.height = 'auto';

            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.paddingRight = ``;
            window.scrollTo(0, scrollY);
        };
    }, [scrollY]);
    let stl = `${styles.backdrop} ${
        props.closingAnimation ? styles.close : ''
    }`;
    return (
        <div
            className={stl}
            onClick={props.onHideCart}
            style={{ animationDuration: ClosingAnimationDelta + 'ms' }}
        ></div>
    );
};

const ModalWindow = props => {
    return (
        <div
            className={`${styles.modal} ${
                props.closingAnimation ? styles.close : ''
            }`}
            style={{ animationDuration: ClosingAnimationDelta + 'ms' }}
        >
            <div className={`${styles.content} `}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');
// const portalElement = document.body;

const Modal = props => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop {...props} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalWindow {...props}>{props.children}</ModalWindow>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default Modal;
