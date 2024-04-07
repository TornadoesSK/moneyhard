import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import styles from './landing-page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@/components/Carousel';

interface CardTip {
  header: string;
  body: string;
}

export default function LandingPage() {
  const cardTips: CardTip[] = [
    {
      header: 'Create Your Own Goal',
      body: "Everyone's financial journey is unique. That's why we allow you to  create your own investment goals tailored to your aspirations.",
    },
    {
      header: 'Follow Your Custom Path',
      body: "We understand that one size doesn't fit all when it comes to investing.  That's why we offer customizable investment paths based on your risk  tolerance, time horizon, and financial situation.",
    },
  ];
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        className={styles.fadeInText}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '40px 40px',
          gap: '25px',
          maxWidth: '400px',
        }}
      >
        <Image
          src="/logo.svg"
          width={200}
          height={33}
          alt="logo"
          style={{ marginBottom: '30px' }}
        />
        <Typography variant="h3" component="h1">
          Your Path to Smarter Investing
        </Typography>
        <Image
          src="landing-page-banner.svg"
          alt="FinWise banner"
          width={300}
          height={250}
        />
        <Typography align="center" variant="body1">
          Investing doesn&apos;t have to be complex or intimidating. With our
          app, we&apos;ve simplified the investing process, making it easy for
          anyone to start their journey towards financial success.
        </Typography>
        <Button
          variant="contained"
          sx={{
            margin: '20px 0',
            width: 192,
            height: 44,
          }}
          LinkComponent={Link}
          href="/api/auth/login?returnTo=/dashboard"
        >
          Log in
        </Button>
        <Typography variant="h3" component="h1">
          Tailored for You
        </Typography>

        <Carousel>
          {cardTips.map(cardTip => (
            <Card
              key={cardTip.header}
              sx={{
                minWidth: 275,
                borderRadius: 4,
                backgroundColor: 'info.main',
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 500 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {cardTip.header}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cardTip.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Carousel>

        <Typography variant="h3" component="h1">
          Use Our AI Assistant
        </Typography>
        <Image
          src="/landing-page-ai-assistant.svg"
          alt="FinWise assistant banner"
          width={300}
          height={250}
        />
        <Typography align="center" variant="body1">
          Powered by cutting-edge technology, our AI analyzes market trends,
          monitors your portfolio, and provides personalized recommendations
          tailored to your goals and preferences.
        </Typography>
      </Box>
    </Box>
  );
}
