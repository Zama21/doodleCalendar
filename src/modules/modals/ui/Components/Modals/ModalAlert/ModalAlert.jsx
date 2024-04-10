import ModalAwareness from '../ModalAwareness/ModalAwareness.jsx';

export default function ModalAlert({ text, ...otherProps }) {
    return <ModalAwareness title={'Сообщение'} text={text} btnText={'Ок'} {...otherProps} />;
}
