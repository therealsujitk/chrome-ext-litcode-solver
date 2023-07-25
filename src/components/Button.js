import { Button as MuiButton } from "@mui/material";

function Button(props) {
  const { children, ...others } = props;

  return (
    <MuiButton sx={{
      borderRadius: '28px',
      textTransform: 'none',
      pl: 2,
      pt: 1,
      pr: 2,
      pb: 1,
    }} {...others}>{children}</MuiButton>
  );
}

export default Button;
