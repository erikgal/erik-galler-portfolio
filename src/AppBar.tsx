import React from 'react';
import { Toolbar, AppBar, Typography, MenuItem } from '@mui/material';
import styled from 'styled-components';

const Bar = styled.div`
    display: flex;
    height: 8vh;
`;

const BarButtons = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`;

interface BarButtons {
    text: string;
    color: string;
}

const AppBarComponent = () => {
    const buttonNames: string[] = ['About Me', 'Portfolio', 'Contact'];

    return (
        <Bar>
            <AppBar sx={{ backgroundColor: '#2b2b2b', display: 'flex', position: 'relative' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#ffffff' }}
                        fontFamily={'-apple-system'}
                        fontSize={28}
                    >
                        Erik Galler
                    </Typography>
                    <BarButtons>
                        {buttonNames.map((name, i) => {
                            return (
                                <MenuItem
                                    key={i}
                                    sx={{
                                        ':hover': {
                                            bgcolor: '#2b2b2b',
                                        },
                                        padding: 0,
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            ':hover': {
                                                color: '#08fdd8',
                                            },
                                            color: '#ffffff',
                                            padding: 1,
                                            paddingRight: 3,
                                            paddingLeft: 2,
                                        }}
                                    >
                                        {name}
                                    </Typography>
                                </MenuItem>
                            );
                        })}
                    </BarButtons>
                </Toolbar>
            </AppBar>
        </Bar>
    );
};

export default AppBarComponent;
