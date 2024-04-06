import { Box, Card, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SingleRowProps {
  leftText: string;
  rightText: string;
  imagePath?: string;
  navigateTo: string;
}

const SingleRow: React.FC<SingleRowProps> = ({ leftText, rightText, imagePath, navigateTo }) => {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(navigateTo);
  };

  return (
    <Card
      onClick={handleRowClick}
      sx={{
        width: 'calc(100% - 50px)',
        borderRadius: 22,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: 'background.main',
        color: 'text.secondary',
        margin: '0 25px 0 25px',
      }}
    >
      <Typography variant="body1">{leftText}</Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" mr={1}>
          {rightText}
        </Typography>
        {imagePath && (
          <img src={imagePath} alt="Image" style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px' }} />
        )}
      </Box>
    </Card>
  );
};

export default SingleRow;
