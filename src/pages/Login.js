import { TextField } from "@mui/material";
import { useState } from "react";
import Button from "../components/Button";

function Login({ onSave }) {
  const [bardKey, setBardKey] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setBardKey(e.target.value);
    setHasError(false);
  };

  const handleSubmit = () => {
    if (bardKey === '') {
      return setHasError(true);
    }

    onSave(bardKey);
  };

  return (
    <>
      <TextField variant="outlined" placeholder="Bard __Secure-1PSID Key" fullWidth size="small" sx={{mb: 1.5}} InputProps={{sx: {borderRadius: '28px'}}} value={bardKey} onChange={handleChange} error={hasError} autoComplete="off" />
      <Button variant="contained" onClick={handleSubmit} fullWidth>Save Key</Button>
    </>
  );
}

export default Login;
