import { Slider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    increment(dx: number) {
        this.x += dx;
    }
}

const Container = styled.div`
    width: 100%;
    height: 50vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
    flex: 1;
`;

const SliderContainer = styled.div`
    width: 60%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
    flex: 1;
`;

interface Coordinates {
    x1: number;
    y1: number;
}

const FourierContainer = () => {
    const [nbrSine, setNbrSine] = useState(1);
    const [points, setPoints] = useState<Point[]>([]);

    const array: Point[] = [];
    const containerRef: React.MutableRefObject<HTMLDivElement> = useRef(document.createElement('div'));

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setNbrSine(newValue);
        }
    };

    const recursiveDrawPartial = (
        ctx: CanvasRenderingContext2D,
        frameCount: number,
        x0: number,
        y0: number,
        i: number,
        max: number,
    ): Coordinates => {
        const radius = (2 * ctx.canvas.height) / 2 / (Math.PI * (2 * i + 1));
        ctx.beginPath();
        ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
        ctx.stroke();

        const x1 = x0 + radius * Math.cos(0.01 * frameCount * (Math.PI * (2 * i + 1)));
        const y1 = y0 + radius * Math.sin(0.01 * frameCount * (Math.PI * (2 * i + 1)));

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        if (i < max) {
            return recursiveDrawPartial(ctx, frameCount, x1, y1, i + 1, max);
        }

        return { x1, y1 };
    };

    const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        ctx.canvas.height = containerRef.current.clientHeight * 0.9;
        ctx.canvas.width = containerRef.current.clientWidth * 0.95;
        ctx.strokeStyle = '#08fdd8';
        ctx.lineWidth = 2;

        const radius = (ctx.canvas.height / 2) * 0.7;
        const x0 = radius + 0.08 * ctx.canvas.width;
        const y0 = ctx.canvas.height / 2;
        const { x1, y1 } = recursiveDrawPartial(ctx, frameCount, x0, y0, 0, nbrSine - 1);

        ctx.beginPath();
        ctx.strokeStyle = '#FD2155';

        array.unshift(new Point(x0 + radius + ctx.canvas.width * 0.05, y1));
        ctx.moveTo(x1, y1);
        array.map((point) => {
            point.increment(1);
            ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
        //setPoints([new Point(x0 + radius + ctx.canvas.width * 0.05, y1), ...points]);
    };

    return (
        <Container ref={containerRef}>
            <Canvas draw={draw}></Canvas>
            <SliderContainer>
                <Slider
                    value={nbrSine}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    min={1}
                    step={1}
                    max={50}
                    onChange={handleChange}
                />
            </SliderContainer>
        </Container>
    );
};

export default FourierContainer;
