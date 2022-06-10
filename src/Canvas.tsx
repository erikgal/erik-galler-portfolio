import React from 'react';
import useCanvas from './useCanvas';

interface CanvasProps {
    draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
}

const Canvas = (props: CanvasProps) => {
    const { draw, ...rest } = props;
    const canvasRef = useCanvas({ draw });

    return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
