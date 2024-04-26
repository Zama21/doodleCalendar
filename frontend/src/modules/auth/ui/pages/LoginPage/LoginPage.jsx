import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Form } from 'shared/ui/components/FormComponents/Form/Form.jsx';
import { FormButton } from 'shared/ui/components/FormComponents/FormButton/FormButton.jsx';
import { FormField } from 'shared/ui/components/FormComponents/FormField/FormField.jsx';
import { FormLink } from 'shared/ui/components/FormComponents/FormLink/FormLink.jsx';
import * as Yup from 'yup';
import { thunkLogin } from '../../../domain/thunks/login.js';
import { AuthPageWrapper } from '../AuthPageWrapper/AuthPageWrapper.jsx';
import { useSelector } from 'react-redux';
import { FormError } from 'shared/ui/components/FormComponents/FormError/FormError.jsx';
import cls from './LoginPage.module.css';
import GoogleAuthButton from '../../components/GoogleAuthButton/GoogleAuthButton.jsx';
import { axiosInstance } from 'shared/api/apiInstance.js';
import { useNavigate } from 'react-router-dom';

const { VITE_APP_SERVER_HOST, VITE_APP_SERVER_PORT } = import.meta.env;

export const LoginPage = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const loginState = useSelector(state => state.auth.login);

    const handleGoogleAuth = () => {
        console.log('Google auth');
        console.log(`${VITE_APP_SERVER_HOST}:${import.meta.env.VITE_APP_SERVER_PORT}/auth/google`);

        window.location.href = `${VITE_APP_SERVER_HOST}:${
            import.meta.env.VITE_APP_SERVER_PORT
        }/auth/google`;
        // navigate(`${VITE_APP_SERVER_HOST}:${import.meta.env.VITE_APP_SERVER_PORT}/auth/google`);
        // axiosInstance.get('/auth/google');
    };

    return (
        <AuthPageWrapper>
            <Formik
                initialValues={{ emailOrUsername: '', password: '' }}
                validationSchema={Yup.object({
                    emailOrUsername: Yup.string().required('Обязательное поле'),
                    password: Yup.string().required('Обязательное поле'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(
                        thunkLogin({
                            emailOrUsername: values.emailOrUsername,
                            password: values.password,
                        })
                    );
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <FormField
                            name='emailOrUsername'
                            type='text'
                            label={'Email или username'}
                            autoComplete='username'
                        />
                        <FormField
                            name='password'
                            type='password'
                            label={'Пароль'}
                            placeholder='Пароль..'
                            autoComplete='password'
                        />
                        <FormButton className={cls.formActionButton} type='submit'>
                            Войти
                        </FormButton>
                        <FormLink to={'/auth/reg'} text={'Нет аккаунта? Зарегистрируйтесь!'} />
                        {loginState.error.length > 0 && <FormError message={loginState.error} />}

                        <div className={cls.googleButtonCont}>
                            <GoogleAuthButton onClick={handleGoogleAuth} />
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthPageWrapper>
    );
};
