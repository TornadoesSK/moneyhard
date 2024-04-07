'use client';

import ChatUI from '@/components/ChatUI';
import { Box } from '@mui/material';

export default function SetUp() {
  return (
    <Box sx={{ height: '100vh', p: '25px' }}>
      <ChatUI isSetup={true} />
    </Box>
  );
}
