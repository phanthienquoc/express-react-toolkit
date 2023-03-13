import React, { useState, useCallback } from 'react';

import { get } from 'lodash'
import { useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import RouteConfig from '../../routes/config';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';

const Aside = () => {
    return (
        <List component={"aside"}>
            {get(RouteConfig.filter((route: any) => route.path === '/'), "[0][children]", []).filter((route: any) => route.path !== "*").map((router: any, index: number) => (
                <MUIMenuItem key={index} route={router} />
            ))}
        </List>
    )
}


const MUIMenuItem = ({ route }: any) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        if (route && route.children) {
            setOpen(!open);
        } else {
            navigate(route.path)
        }
    }, [open]);

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon >
                    <StarBorder />
                </ListItemIcon>
                <ListItemText primary={route.label} />
                {route && route.children &&
                    <React.Fragment>
                        {open ? <ExpandMore /> : <ExpandLess />}
                    </React.Fragment>
                }
            </ListItemButton>
            {
                route && route.children &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List sx={{ pl: 4 }} component="div" disablePadding>
                        {route.children.map((routeItem: any, routeItemIdx: number) => <MUIMenuItem key={routeItemIdx} route={routeItem} />)}
                    </List>
                </Collapse>
            }
        </React.Fragment >
    )
}

export default Aside;