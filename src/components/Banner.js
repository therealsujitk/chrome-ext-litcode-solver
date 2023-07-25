import { CheckCircle, Error, Warning } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";

function Banner({ variant, message }) {
  let icon = <CircularProgress sx={{display: 'flex', alignItems: 'center', color: 'teal'}} size={30} />;
  let color = 'teal';

  if (variant === 'success') {
    icon = <CheckCircle />
    color = 'lightgreen';
  } else if (variant === 'warning') {
    icon = <Warning />;
    color = 'orange';
  } else if (variant === 'error') {
    icon = <Error />;
    color = 'red';
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        color: color,
        border: '1px solid',
        borderRadius: 2,
        pl: 1.5,
        pt: 1,
        pr: 1.5,
        pb: 1,
      }}
    >
      {icon}
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
}

export default Banner;
