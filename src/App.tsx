import React from 'react';
import styled from 'styled-components';
import AppBarComponent from './AppBar';
import FourierSeries from './FourierSeries';
import FourierSeriesIntro from './FourierSeriesIntro';
import FourierTransform from './FourierTransform';
import Intro from './Intro';

const Container = styled.div`
    width: 100vw;
    height: 150vh;
    background-color: #1d1d1d;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
`;

function App() {
    return (
        <Container className="Container">
            <AppBarComponent />
            <Intro />
            <FourierSeriesIntro />
            <FourierSeries />
            <FourierTransform />
        </Container>
    );
}

export default App;
