import React from 'react';

import Box from '../../core/Box';

import { Link } from 'react-router-dom';
import { browserName, osName, osVersion, OsTypes } from 'react-device-detect';

const Home = (props: any) => {
    console.log(OsTypes)
    return (
        <Box>
            <Box>
                Home
            </Box>
            <Link to={"/user"} >
                User
            </Link>
            {browserName}, {osName},{osVersion}

        </Box>
    )
}

export default Home;