import React from 'react';
import styled, { keyframes } from 'styled-components';
import AnimatedCharacter from './AnimatedCharacter';

const IntroContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Line = styled.div`
    display: flex;
    flex-direction: row;
`;

const introText = [
    'I enjoy using Maths in programming to visualize complex concepts.',
    'For example the beauty of the Fourier Series as visualized bellow:',
];

const specialWords = ['Maths', 'Fourier', 'Series'];

const FourierSeriesIntro = () => {
    return (
        <IntroContainer>
            {introText.map((text, i) => {
                const string = text.split(' ');

                let stringArray: string[] = [];
                let specialChars: boolean[] = [];
                for (let i = 0; i < string.length; i++) {
                    if (specialWords.indexOf(string[i]) > -1) {
                        specialChars = specialChars.concat(new Array(string[i].length).fill(true));
                    } else {
                        specialChars = specialChars.concat(new Array(string[i].length).fill(false));
                    }
                    console.log(specialChars);
                    stringArray = stringArray.concat(string[i].split(''));
                    if (i != string.length - 1) {
                        specialChars = specialChars.concat(false);
                        stringArray.push(' ');
                    }
                }
                return (
                    <Line key={i}>
                        {stringArray.map((char, j) => {
                            if (char !== ' ') {
                                return (
                                    <AnimatedCharacter
                                        key={j}
                                        character={char}
                                        size={270}
                                        color={specialChars[j] ? '#08fdd8' : 'white'}
                                    />
                                );
                            } else {
                                return <span style={{ paddingLeft: '25px' }} key={j}></span>;
                            }
                        })}
                    </Line>
                );
            })}
        </IntroContainer>
    );
};

export default FourierSeriesIntro;
