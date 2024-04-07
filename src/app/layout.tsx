import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import hasUserCompletedInitialForm from '@/db-operations/hasUserCompletedInitialForm';
import { redirect } from 'next/navigation';
import { getSession } from '@auth0/nextjs-auth0';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Title',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </UserProvider>
    </html>
  );
}
