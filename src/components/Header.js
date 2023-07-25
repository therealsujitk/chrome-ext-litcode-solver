import { Logout } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

function Header({ removeBardKey }) {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 1.5, justifyContent: 'space-between', width: '100%'}}>
      <Typography variant="h5" color="white">Litcode Solver</Typography>
      {removeBardKey && <Tooltip title="Logout"><IconButton onClick={removeBardKey} color="primary"><Logout /></IconButton></Tooltip>}
    </Box>
  );
}

export default Header;
