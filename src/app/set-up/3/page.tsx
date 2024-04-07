'use client';

import ChatUI from '@/components/ChatUI';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { completeUserInitForm } from '@/service/completeUserInitForm';

export default function SetUp() {
  return (
    <Box sx={{ height: '100vh', p: '25px', pt: '45px' }}>
      <ChatUI isSetup={true} />
      <Button
        onClick={async () => {
          await completeUserInitForm();
        }}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '10px',
        }}
      >
        End chat
      </Button>
    </Box>
  );
}
