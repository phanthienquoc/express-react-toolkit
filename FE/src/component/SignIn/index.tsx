import React from 'react';
import Box from '../../core/Box';
import Button from '../../core/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signIn } from '../../features/auth/actions'

const SignIn = (props: any) => {
    const { loading, user, access_token } = useAppSelector((state: any) => state.auth)
    const dispath = useAppDispatch()

    const _handleSignIn = () => {
        dispath(signIn({
            email: "quocpt@inspirelab.com",
            password: "Abcde12345-"
        }))
    }
    return (
        <Box>
            <Button onClick={_handleSignIn}>
                SignIn
            </Button>
            <Box>
                {access_token}
            </Box>
        </Box>
    )
}

export default SignIn;