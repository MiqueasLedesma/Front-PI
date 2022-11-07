import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Navbar } from './components/Navbar';
import { Videogames } from './components/Videogames';
import { CreateGame } from './components/CreateGame';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { useSelector } from 'react-redux';
import { theme } from './index';
import { SearchGames } from './components/SearchGames';
import { Detail } from './components/Detail';
import { LandingPage } from './components/LandingPage';


const AppContainer = styled.div`
    margin: 0;
    padding: 0;
    background-color: ${props => localStorage.theme !== 'dark' ? props.theme.primaryBack : props.theme.secundaryBack};
    background-image: ${props => props.theme.landingImage};
`

if (!localStorage.theme) localStorage.setItem('theme', 'ligth');

function App() {
  const reduxState = useSelector(state => state.themeReducer.theme);
  const [state, setState] = useState(false);
  const [thema, setTheme] = useState('');
  useEffect(() => {
    let changeRedux = () => {
      setTheme(reduxState)
    }
    changeRedux();
  }, [thema])



  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar setState={setState} state={state} />
        <Routes>
          <Route path='/' element={state ? null : <LandingPage />} />
          <Route path='/games' element={state ? null : <Videogames />} />
          <Route path='/create' element={state ? null : <CreateGame />} />
          <Route path='/detail' element={state ? null : <Detail />} />
          <Route path='/search' element={state ? null : <SearchGames />} />
        </Routes>
        {state ? null : <Footer />}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
