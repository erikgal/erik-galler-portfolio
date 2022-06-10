import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Canvas from './Canvas';
import CustomButton from './CustomButton';
import styled from 'styled-components';

interface DrawingCanvasProps {
    containerRef: React.MutableRefObject<HTMLDivElement>;
    drawingPoints: Coordinates[];
    setDrawingPoints: Dispatch<SetStateAction<Coordinates[]>>;
}

interface Coordinates {
    x1: number;
    y1: number;
}

const CanvasContainer = styled.div`
    display: flex;
    flex: 1;
    border-color: white;
    border-width: 2px;
    border-style: solid;
    border-radius: 25px;
`;

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;
export const ButtonContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const DrawingCanvas = ({ containerRef, drawingPoints, setDrawingPoints }: DrawingCanvasProps) => {
    const [clearCanvas, setClearCanvas] = useState(false);

    let points: Coordinates[] = [];

    const drawFigure = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        // Brush colour and size
        if (
            Math.abs(ctx.canvas.height - Math.round(containerRef.current.clientHeight * 0.9)) > 1 ||
            Math.abs(ctx.canvas.width - Math.round(containerRef.current.clientWidth * 0.95)) > 1
        ) {
            //ctx.scale(1, -1);
            //ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
            ctx.canvas.height = containerRef.current.clientHeight * 0.9;
            ctx.canvas.width = containerRef.current.clientWidth * 0.95;
        }

        if (clearCanvas) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            setClearCanvas(false);
            points = [];
        }

        const colour = '#ffffff';
        const strokeWidth = 3;

        // Drawing state
        let latestPoint: number[] = [];
        let drawing = false;
        // Drawing functions
        const continueStroke = (newPoint: number[]) => {
            ctx.beginPath();
            ctx.moveTo(latestPoint[0], latestPoint[1]);
            ctx.strokeStyle = colour;
            ctx.lineWidth = strokeWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineTo(newPoint[0], newPoint[1]);
            ctx.stroke();

            points.push(transformCoordinates({ x1: latestPoint[0], y1: latestPoint[1] }));
            latestPoint = newPoint;
        };
        // Event helpers
        const startStroke = (point: number[]) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            points = [];
            drawing = true;
            latestPoint = point;
        };
        const BUTTON = 0b01;
        const mouseButtonIsDown = (buttons: number) => (BUTTON & buttons) === BUTTON;

        // Event handlers
        const mouseMove = (evt: MouseEvent) => {
            if (!drawing) {
                return;
            }
            continueStroke([evt.offsetX, evt.offsetY]);
        };
        const mouseDown = (evt: MouseEvent) => {
            if (drawing) {
                return;
            }
            evt.preventDefault();
            ctx.canvas.addEventListener('mousemove', mouseMove, false);
            startStroke([evt.offsetX, evt.offsetY]);
        };
        const mouseEnter = (evt: MouseEvent) => {
            if (!mouseButtonIsDown(evt.buttons) || drawing) {
                return;
            }
            mouseDown(evt);
        };
        const endStroke = (evt: MouseEvent) => {
            if (!drawing) {
                return;
            }
            drawing = false;
            const node = evt.currentTarget as HTMLElement;
            node.removeEventListener('mousemove', (evt: MouseEvent) => mouseMove(evt), false);
        };

        // Register event handlers
        ctx.canvas.addEventListener('mousedown', mouseDown, false);
        ctx.canvas.addEventListener('mouseup', endStroke, false);
        ctx.canvas.addEventListener('mouseout', endStroke, false);
        ctx.canvas.addEventListener('mouseenter', mouseEnter, false);

        const getTouchPoint = (evt: TouchEvent) => {
            if (!evt.currentTarget) {
                return [0, 0];
            }
            const node = evt.currentTarget as HTMLElement;
            const rect = node.getBoundingClientRect();
            const touch = evt.targetTouches[0];
            return [touch.clientX - rect.left, touch.clientY - rect.top];
        };
        const touchStart = (evt: TouchEvent) => {
            if (drawing) {
                return;
            }
            evt.preventDefault();
            startStroke(getTouchPoint(evt));
        };
        const touchMove = (evt: TouchEvent) => {
            if (!drawing) {
                return;
            }
            continueStroke(getTouchPoint(evt));
        };
        const touchEnd = (evt: TouchEvent) => {
            drawing = false;
        };

        ctx.canvas.addEventListener('touchstart', (evt) => touchStart(evt), false);
        ctx.canvas.addEventListener('touchend', (evt) => touchEnd(evt), false);
        ctx.canvas.addEventListener('touchcancel', (evt) => touchEnd(evt), false);
        ctx.canvas.addEventListener('touchmove', (evt) => touchMove(evt), false);

        const transformCoordinates = (point: Coordinates) => {
            return { x1: point.x1 - ctx.canvas.width / 2, y1: -(point.y1 - ctx.canvas.height / 2) };
        };
    };

    return (
        <Container>
            <CanvasContainer>
                <Canvas draw={drawFigure}></Canvas>
            </CanvasContainer>
            <ButtonContainer>
                <CustomButton color={'cyan'} text={'Submit'} onClick={() => setDrawingPoints(points)} />
                <CustomButton color={'magenta'} text={'Reset'} onClick={() => setClearCanvas(true)} />
            </ButtonContainer>
        </Container>
    );
};

export default DrawingCanvas;
