import React from 'react';

import { Link } from 'react-router-dom';

import Box from '../../core/Box';

const Home = (props: any) => {
    return (
        <Box>
            <Box>
                Home
            </Box>
            <Link to={"/user"} >
                User
            </Link>
        </Box>
    )
}

export default Home;