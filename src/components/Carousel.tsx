import styles from './Carousel.module.css';
import { Box } from '@mui/material';

export default function Carousel({ children }: any) {
  return (
    <Box
      className={styles.hideScrollbar}
      sx={{
        display: 'flex',
        maxWidth: '100%',
        gap: '20px',
        overflowX: 'scroll',
      }}
    >
      {children}
    </Box>
  );
}
