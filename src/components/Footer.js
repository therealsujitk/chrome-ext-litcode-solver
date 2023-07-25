import { Box, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{textAlign: 'center', marginTop: 1.5}}>
        <Typography variant="subtitle2" color="white">Built by <Link href="https://therealsuji.tk" target="_blank">@therealsujitk</Link></Typography>
    </Box>
  );
}

export default Footer;
