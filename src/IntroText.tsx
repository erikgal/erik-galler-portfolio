import React from 'react';
import styled, { keyframes } from 'styled-components';
import AnimatedCharacter from './AnimatedCharacter';

const animation = keyframes`
0% { opacity: 0; transform: translateY(-100px) skewX(10deg) skewY(10deg) rotateZ(30deg); filter: blur(10px); }
100% { opacity: 1; transform: translateY(0px) skewX(0deg) skewY(0deg) rotateZ(0deg); filter: blur(0px); }
`;

const IntroContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 20px;
    justify-content: center;
    align-items: center;
`;

const Line = styled.div`
    display: flex;
    flex-direction: row;
    animation-name: ${animation};
    animation-duration: 2s;
    animation-fill-mode: forwards;
`;

const introText = [
    "Hi, I'm Erik Galler,",
    'student of geomatics',
    'and artificial intelligence,',
    'web developer,',
    'CS enthusiast',
];

const specialWords = ['artificial', 'intelligence,'];

const IntroText = () => {
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
                                        size={400}
                                        color={specialChars[j] && char != ',' ? '#08fdd8' : 'white'}
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

export default IntroText;
