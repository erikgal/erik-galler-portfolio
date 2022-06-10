import React from 'react';
import { Button, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        cyan: {
            main: '#08fdd8',
        },
        magenta: {
            main: '#FD2155',
            light: '#FD2155',
            dark: '#FD2155',
            contrastText: '#FD2155',
        },
    },
});

declare module '@mui/material/styles' {
    interface Palette {
        cyan: Palette['primary'];
        magenta: Palette['secondary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        cyan?: PaletteOptions['primary'];
        magenta?: PaletteOptions['secondary'];
    }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        cyan: true;
        magenta: true;
    }
}

interface CustomButtonProps {
    text: string;
    color?:
        | 'cyan'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning'
        | 'magenta'
        | undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    disable?: boolean;
}

const CustomButton = ({ text, color, onClick, disable }: CustomButtonProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Button
                color={color}
                variant="outlined"
                style={{ margin: '8px' }}
                onClick={onClick}
                disabled={disable}
            >
                {text}
            </Button>
        </ThemeProvider>
    );
};

export default CustomButton;
