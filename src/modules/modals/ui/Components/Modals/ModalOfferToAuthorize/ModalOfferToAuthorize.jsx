import React, { useState } from 'react';
import joinUsImg from './img/joinUsImg.png';
import stl from './ModalOfferToAuthorize.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalTwoBtn from 'modules/modals/ui/Components/Modals/BaseModals/ModalTwoBtn/ModalTwoBtn.jsx';

export default function ModalOfferToAuthorize({ onHideCart, ...otherProps }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleAgree = () => {
        onHideCart();
        navigate(`/auth/login?redirect=${location.pathname}`);
    };

    let obj = {
        title: 'Авторизация',
        text: (
            <>
                <div className={stl.wrapperJoinUsImg}>
                    <img className={stl.joinUsImg} src={joinUsImg} alt='' />
                </div>
                <p>
                    <span className={stl.keyword}>Ой, кажется, вы еще не авторизовались!</span>
                </p>
                <p>
                    Мы были бы очень рады познакомиться с вами поближе и предложить вам наши уникальные
                    возможности. Позвольте нам узнать вас получше и создать приятную атмосферу для
                    взаимодействия!
                </p>
                <p>
                    <span className={stl.keyword}>Познакомимся?</span>
                </p>
            </>
        ),
        btnAgreeText: 'Хорошо',
        btnDisagreeText: 'Нет!',
        ...otherProps,
    };
    return <>{<ModalTwoBtn {...obj} handleDisagree={onHideCart} handleAgree={handleAgree} />}</>;
}
