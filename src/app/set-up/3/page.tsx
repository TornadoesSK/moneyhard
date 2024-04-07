'use client';

import ChatUI from '@/components/ChatUI';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { completeUserInitForm } from '@/service/completeUserInitForm';

export default function SetUp() {
  return (
    <Box sx={{ height: '100vh', p: '25px' }}>
      <ChatUI isSetup={true} />
        <Button
            onClick={async () => {
                await completeUserInitForm();
            }}
        >
            End chat
        </Button>
    </Box>
  );
}