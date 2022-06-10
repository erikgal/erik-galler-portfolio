import { Slider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';
import CustomButton from './CustomButton';
import DrawingCanvas, { ButtonContainer } from './DrawingCanvas';
import { discreteFourierTransform, ComplexNumber } from './functions/discreteFourierTransform';
import { quickSort } from './functions/quicksort';

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
    height: 85vh;
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
    const [drawingPoints, setDrawingPoints] = useState<Coordinates[]>([]);
    const [fourierPoints, setFourierPoints] = useState<ComplexNumber[]>([]);

    useEffect(() => {
        if (drawingPoints.length > 0) {
            const points: Coordinates[] = [];
            let prevPoint: Coordinates = drawingPoints[0];
            points.push(prevPoint);
            drawingPoints.map((point) => {
                if (prevPoint.x1 != point.x1 || prevPoint.y1 != point.y1) {
                    points.push(point);
                    prevPoint = point;
                }
            });
            setFourierPoints(quickSort(discreteFourierTransform(points)));
        }
    }, [drawingPoints]);

    let array: Point[] = [];
    const containerRef: React.MutableRefObject<HTMLDivElement> = useRef(document.createElement('div'));

    const drawCycloids = (
        ctx: CanvasRenderingContext2D,
        frameCount: number,
        x0: number,
        y0: number,
        i: number,
    ): Coordinates => {
        const radius = fourierPoints[i].amplitude;
        const dt = (2 * Math.PI) / fourierPoints.length;
        ctx.beginPath();
        ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
        ctx.stroke();

        const x1 = x0 + radius * Math.sin(-dt * frameCount * fourierPoints[i].freq + fourierPoints[i].phase);
        const y1 = y0 + radius * Math.cos(-dt * frameCount * fourierPoints[i].freq + fourierPoints[i].phase);

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        if (i < fourierPoints.length - 1) {
            return drawCycloids(ctx, frameCount, x1, y1, i + 1);
        }

        return { x1, y1 };
    };

    const drawFourier = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        ctx.canvas.height = containerRef.current.clientHeight * 0.9;
        ctx.canvas.width = containerRef.current.clientWidth * 0.95;
        ctx.strokeStyle = '#08fdd8';
        ctx.lineWidth = 3;

        if (array.length > fourierPoints.length) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            array = [];
        }

        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.scale(1, -1);
        const { x1, y1 } = drawCycloids(ctx, frameCount, 0, 0, 0);
        array.push(new Point(x1, y1));

        if (array.length > 0) {
            ctx.beginPath();
            ctx.strokeStyle = '#FD2155';
            ctx.moveTo(array[0].x, array[0].y);
            array.map((point) => {
                ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
        }
    };

    return (
        <Container ref={containerRef}>
            {fourierPoints.length > 0 ? (
                <div>
                    <Canvas draw={drawFourier}></Canvas>
                    <ButtonContainer>
                        <CustomButton color={'magenta'} text={'Reset'} onClick={() => setFourierPoints([])} />
                    </ButtonContainer>
                </div>
            ) : (
                <DrawingCanvas
                    containerRef={containerRef}
                    drawingPoints={drawingPoints}
                    setDrawingPoints={setDrawingPoints}
                />
            )}
        </Container>
    );
};

export default FourierContainer;
