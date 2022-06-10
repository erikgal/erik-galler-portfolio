import { useRef, useEffect } from 'react';

interface UseCanvasProps {
    draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
}

const useCanvas = ({ draw }: UseCanvasProps) => {
    const canvasRef: React.MutableRefObject<null | HTMLCanvasElement> = useRef(null);

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        let frameCount = 0;
        let animationFrameId: number;

        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return canvasRef;
};

export default useCanvas;
