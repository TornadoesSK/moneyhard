'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoggedHeaderProps {
  showBackButton: boolean;
  content: string;
  balance?: number;
}

export default function LoggedHeader({
  showBackButton,
  content,
  balance,
}: LoggedHeaderProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        p: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {showBackButton && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': { cursor: 'pointer' },
            }}
            onClick={() => router.back()}
          >
            <ArrowBackIcon />
          </Box>
        )}
        {content === 'balance' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '12px', color: '#b3b3b3' }}>
              Total balance
            </Typography>
            <Typography sx={{ fontSize: '18px' }}>{balance ?? '2 587'} €</Typography>
          </Box>
        ) : (
          <Typography
            component="h1"
            sx={{ fontSize: '18px', textAlign: 'center' }}
          >
            {content}
          </Typography>
        )}
      </Box>
      <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/logo.svg" width={100} height={17} alt="logo" />
      </Link>
    </Box>
  );
}
