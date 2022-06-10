interface Coordinates {
    x1: number; // Real part
    y1: number; // Imaginary part
}

export interface ComplexNumber {
    Re: number;
    Im: number;
    amplitude: number;
    phase: number;
    freq: number;
}

export function discreteFourierTransform(xn: Coordinates[]) {
    const N = xn.length;
    const Xk: ComplexNumber[] = [];

    [...Array(N).keys()].map((k) => {
        let Re = 0;
        let Im = 0;
        // Sum of Complex number multiplication
        xn.map((x, n) => {
            const theta = (2 * Math.PI * k * n) / N;
            Re += x.x1 * Math.cos(theta); // Re x Re = Re
            Re += x.y1 * Math.sin(theta); // Im x Im = Re
            Im -= x.x1 * Math.sin(theta); // Re x Im = Im
            Im += x.y1 * Math.cos(theta); // Im x Re = Im
        });
        Re = Re / N;
        Im = Im / N;
        const amplitude = Math.sqrt(Re * Re + Im * Im);
        const phase = Math.atan2(Re, Im);
        Xk.push({ Re, Im, amplitude, phase, freq: k });
    });
    return Xk;
}
