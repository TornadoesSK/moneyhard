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
        fontFamily: inter.style.fontFamily,
    },
});

export default theme;
