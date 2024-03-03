import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      height={80}
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
