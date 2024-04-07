'use client';

import ChatUI from '@/components/ChatUI';
import { Button } from '@mui/material';
import { completeUserInitForm } from '@/service/completeUserInitForm';

export default function SetUp() {
  return (
    <>
      <ChatUI />
      <Button
        onClick={async () => {
          await completeUserInitForm();
        }}
      >
        End chat
      </Button>
    </>
  );
}
