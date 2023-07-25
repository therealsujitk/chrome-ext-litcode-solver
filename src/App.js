import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import { teal } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: teal
  },
  typography: {
    fontFamily: ["Rubik"]
  }
});

function App() {
  const [bardKey, _setBardKey] = useState();

  useEffect(() => {
    chrome?.storage?.local?.get('bardKey')?.then(result => _setBardKey(result.bardKey));
  });

  const setBardKey = (bardKey) => {
    chrome?.storage?.local?.set({bardKey: bardKey});
    _setBardKey(bardKey);
  };

  const removeBardKey = () => {
    chrome?.storage?.local?.remove('bardKey');
    _setBardKey(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Header removeBardKey={bardKey ? removeBardKey : null} />
      {Boolean(bardKey) ? <Home bardKey={bardKey} /> : <Login onSave={setBardKey} />}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
