import React, { useEffect } from 'react';

import * as Yup from 'yup';
import Box from '../../core/Box';
import Button from '../../core/Button';
import FastField from '../../shareComponent/Formik/FastField';

import { isEmpty, get } from 'lodash';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../features/auth/actions';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const signUpSchema = Yup.object().shape({
    email: Yup.string().required().label("Email"),
    password: Yup.string().required().label("password"),
})

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { loading, user } = useAppSelector((state: any) => state.auth);

    useEffect(() => {
        if (!isEmpty(get(user, "access_token"))) {
            navigate("/")
        }
    }, [])

    const _handleSubmit = async (data: any) => {
        try {
            await dispatch(signUp(data));
            navigate("/");
            console.log('Registration successful:', user);
        } catch (error) {
            console.log('Registration failed:', error);
        }
    }

    console.log(user && user.access_token)

    return (
        <Formik
            onSubmit={_handleSubmit}
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={signUpSchema}
        >
            {({ values, error }: any) => {
                return (
                    <Form style={{ display: "flex", flexDirection: "column", minWidth: 360, maxWidth: 420, margin: "0 auto" }}>
                        <Box>
                            {user.access_token}
                        </Box>
                        <FastField
                            required
                            type={"email"}
                            name={"email"}
                            label={"Email"}
                        />
                        <FastField
                            required
                            type='password'
                            name={'password'}
                            label={"Password"}
                        />
                        <Button type='submit' className='button' disabled={loading || !isEmpty(error)}>
                            {loading ? 'loading' : 'Register'}
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default SignUp