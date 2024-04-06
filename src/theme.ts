'use client';

import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin-ext'],
    display: 'swap'
});

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily
    },
    palette: {
        primary: {
            main: '#0097f6',
            contrastText: '#ffffff'
        },
        background: {
            default: '#1c1d22',
            paper: '#d9d9d9'
        },
        text: {
            primary: '#ffffff',
            secondary: '#191919'
        }
    }
});

export default theme;
