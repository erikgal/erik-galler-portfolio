import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
    0%   { transform: scale(1,1)      }
    10%  { transform: scale(1.2,.8)   }
    30%  { transform: scale(.8,1.1)   }
    50%  { transform: scale(1.1,.90)  }
    57%  { transform: scale(1,1.3)    }
    64%  { transform: scale(1,1)      }
    100% { transform: scale(1,1)      }
`;

const Character = styled.span`
    color: white;
    font-size: 400%;
    position: relative;
    &.animated {
        color: #08fdd8;
        animation-name: ${animation};
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    }
`;

interface Character {
    character: string;
}

const AnimatedCharacter = ({ character }: Character) => {
    const [animated, setAnimated] = useState(false);

    return (
        <Character
            className={animated ? 'animated' : ''}
            onMouseEnter={() => setAnimated(() => true)}
            onAnimationEnd={() => setAnimated(() => false)}
        >
            {character}
        </Character>
    );
};

export default AnimatedCharacter;
