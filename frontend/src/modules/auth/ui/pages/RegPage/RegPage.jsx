import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { thunkRegister } from '../../../domain/thunks/register.js';
import { AuthPageWrapper } from '../AuthPageWrapper/AuthPageWrapper.jsx';
import { useSelector } from 'react-redux';
import { FormError } from 'shared/ui/components/FormComponents/FormError/FormError.jsx';
import { FormField } from 'shared/ui/components/FormComponents/FormField/FormField.jsx';
import { FormButton } from 'shared/ui/components/FormComponents/FormButton/FormButton.jsx';
import { FormLink } from 'shared/ui/components/FormComponents/FormLink/FormLink.jsx';
import { Form } from 'shared/ui/components/FormComponents/Form/Form.jsx';
import { authActions } from 'modules/auth/store/slices/authSlice.js';
import cls from './RegPage.module.css';

export const RegPage = () => {
    const registerState = useSelector(state => state.auth.registration);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <AuthPageWrapper>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    passwordRepeat: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Некорректный адрес email').required('Обязательное поле'),
                    username: Yup.string()
                        .min(4, 'username должен быть не короче 4 символов')
                        .required('Обязательное поле'),
                    password: Yup.string()
                        .min(8, 'Пароль должен быть не короче 8 символов')
                        .required('Обязательное поле'),
                    passwordRepeat: Yup.string()
                        .min(8, 'Пароль должен быть не короче 8 символов')
                        .required('Обязательное поле'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    if (values.password === values.passwordRepeat) {
                        dispatch(
                            thunkRegister({
                                email: values.email,
                                password: values.password,
                                username: values.username,
                            })
                        )
                            .unwrap()
                            .then(() => {
                                navigate('/auth/login');
                            });
                    } else {
                        dispatch(
                            authActions.setRegistrationData({
                                success: false,
                                error: 'Пароли не совпали',
                            })
                        );
                    }
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <FormField
                            name='username'
                            type='text'
                            label={'Username'}
                            placeholder='придумайте username'
                            autoComplete='username'
                        />
                        <FormField
                            name='email'
                            type='email'
                            label={'Email'}
                            placeholder='example@mail.ru'
                            autoComplete='username'
                        />
                        <FormField
                            name='password'
                            type='password'
                            label={'Пароль'}
                            placeholder='Пароль..'
                            autoComplete='new-password'
                        />
                        <FormField
                            name='passwordRepeat'
                            type='password'
                            label={'Повторите пароль'}
                            placeholder='Пароль..'
                            autoComplete='new-password'
                        />
                        <FormButton className={cls.formActionButton} type='submit'>
                            Зарегистрироваться
                        </FormButton>
                        <FormLink to={'/auth/login'} text={'Уже есть аккаунт? Войдите!'} />
                        {registerState.error.length > 0 && <FormError message={registerState.error} />}
                    </Form>
                )}
            </Formik>
        </AuthPageWrapper>
    );
};
