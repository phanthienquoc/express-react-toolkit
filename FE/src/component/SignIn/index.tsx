import React, { useEffect } from 'react';

import Box from '../../core/Box';
import Button from '../../core/Button';
import FastField from '../../shareComponent/Formik/FastField';

import * as Yup from 'yup';
import { isEmpty, get } from 'lodash';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../features/auth/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const signInSchema = Yup.object().shape({
    email: Yup.string().required().label("Email"),
    password: Yup.string().required().label("password"),
})

const SignIn = (props: any) => {
    const navigate = useNavigate();
    const dispath = useAppDispatch();
    const { loading, user } = useAppSelector((state: any) => state.auth)

    useEffect(() => {
        if (!isEmpty(get(user, "access_token"))) {
            navigate("/")
        }
    }, [])

    const _handleSignIn = async (data: any) => {
        try {
            await dispath(signIn(data))
            navigate("/")
        } catch (error) {
            console.log('Registration failed:', error);
        }
    }

    return (
        <Box>
            <Formik
                onSubmit={_handleSignIn}
                initialValues={{
                    email: "phanthienquoc@outlook.com",
                    password: "Abcde12345-",
                }}
                validationSchema={signInSchema}
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
                                {loading ? 'loading' : 'Signin'}
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
            <Link to={"/auth/signup"} >
                signup
            </Link>
        </Box>
    )
}

export default SignIn;