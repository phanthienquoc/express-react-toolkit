import React from 'react';
import Box from '../../core/Box';

import { Formik, Form, FastField } from 'formik'
import { signUp } from '../../features/auth/actions'
import { useAppSelector, useAppDispatch } from '../../store/hooks';


const SignUp = () => {
    const dispatch = useAppDispatch();
    const { loading, user, access_token, error, success } = useAppSelector((state: any) => state.auth);

    const _handleSubmit = async (data: any) => {
        try {
            const resultAction: any = await dispatch(signUp(data));
            console.log('Registration successful:', user);
            // update UI or navigate to another page
        } catch (error) {
            console.log('Registration failed:', error);
            // show error message or update UI
        }
    }

    console.log(loading, error, success)

    return (
        <Formik
            onSubmit={_handleSubmit}
            initialValues={{
                email: "",
                password: "",
                last_name: "",
                first_name: "",
            }}
        >
            {({ values, error }: any) => {
                return (
                    <Form>
                        <Box>
                            {access_token}
                        </Box>
                        <Box className='form-group'>
                            <label htmlFor='firstName'>First Name</label>
                            <FastField
                                type='text'
                                className='form-input'
                                required
                                name={"first_name"}
                            />
                        </Box>
                        <Box className='form-group'>
                            <label htmlFor='lastName'>Last Name</label>
                            <FastField
                                required
                                type='text'
                                name={"last_name"}
                                className='form-input'
                            />
                        </Box>
                        <Box className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <FastField
                                required
                                type={"email"}
                                name={"email"}
                            />
                        </Box>
                        <Box className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <FastField
                                required
                                type='password'
                                name={'password'}
                            />
                        </Box>
                        <button type='submit' className='button' disabled={loading}>
                            {loading ? 'loading' : 'Register'}
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default SignUp