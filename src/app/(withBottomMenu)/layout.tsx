'use client';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  Paper,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useState } from 'react';
import ChatUI from '@/components/ChatUI';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [drawerOpenned, setDrawerOpenned] = useState(false);

  return (
    <Box sx={{ pb: '80px' }}>
      {children}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          py: '10px',
          backgroundColor: 'background.default',
          zIndex: 99999
        }}
        elevation={5}
      >
        <BottomNavigation
          showLabels
          sx={{
            backgroundColor: 'background.default',
            justifyContent: 'space-evenly',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '15px',
            },
          }}
        >
          <BottomNavigationAction
            label="Dashboard"
            sx={{ color: 'text.primary', gap: '3px' }}
            LinkComponent={Link}
            href="/dashboard"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            onClick={() => setDrawerOpenned(true)}
            icon={<ChatIcon fontSize="large" />}
            sx={{
              color: 'text.primary',
              backgroundColor: 'primary.main',
              gap: '3px',
              width: 70,
              maxWidth: 70,
              height: 70,
              minWidth: 'unset',
              borderRadius: '50%',
              bottom: '25px',
              boxShadow:
                '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            }}
          />
          <BottomNavigationAction
            label="Logout"
            icon={<LogoutIcon />}
            sx={{ color: 'text.primary', gap: '3px' }}
            href="/api/auth/logout"
          />
        </BottomNavigation>
      </Paper>
      <Drawer
        anchor="bottom"
        open={drawerOpenned}
        onClose={() => {
          setDrawerOpenned(false);
          window.location.href = window.location.href;
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'background.default',
            color: 'text.primary',
            height: '80vh',
            pt: '50px',
            pb: '25px',
            px: '25px',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 4,
            '&:hover': { cursor: 'pointer' },
            p: '10px',
          }}
          onClick={() => {
            setDrawerOpenned(false);
            window.location.href = window.location.href;
          }}
        >
          &#x2715;
        </Box>
        <ChatUI isSetup={false} />
      </Drawer>
    </Box>
  );
}
