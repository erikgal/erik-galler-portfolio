import React from 'react';
import styled from 'styled-components';
import profile_picture from './assets/profile_picture.jpg';
import IntroText from './IntroText';

const Container = styled.div`
    display: flex;
    height: 70vh;
`;

const ProfileContainer = styled.div`
    display: flex;
    width: 40%;
    margin: 20px;
    justify-content: center;
    padding-left: 100;
`;

const Intro = () => (
    <Container>
        <ProfileContainer>
            <img src={profile_picture}></img>
        </ProfileContainer>
        <IntroText />
    </Container>
);

export default Intro;
