import React from 'react';
import styled from 'styled-components';

import { Typography } from '@mui/material';

const IntroContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 20px;
    justify-content: center;
    align-items: center;
`;

const IntroText = () => {
    const fontSize = 62;

    return (
        <IntroContainer>
            <Typography
                textAlign="center"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#ffffff' }}
                fontSize={fontSize}
            >
                Hi, I&apos;m Erik Galler,
            </Typography>
            <Typography
                textAlign="center"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#ffffff' }}
                fontSize={fontSize}
            >
                student of geomatics
            </Typography>
            <Typography
                textAlign="center"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#ffffff' }}
                fontSize={fontSize}
            >
                and artificial intelligence,
            </Typography>
            <Typography
                textAlign="center"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#ffffff' }}
                fontSize={fontSize}
            >
                web developer,
            </Typography>
            <Typography
                textAlign="center"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#ffffff' }}
                fontSize={fontSize}
            >
                CS enthusiast
            </Typography>
        </IntroContainer>
    );
};

export default IntroText;
