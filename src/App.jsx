import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Navbar } from './components/Navbar';
import { Videogames } from './components/Videogames';
import { CreateGame } from './components/CreateGame';
import { About } from './components/About';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from './redux/actions/videogamesActions';
import { theme } from './index';
import { SearchGames } from './components/SearchGames';

const AppContainer = styled.div`
    margin: 0;
    padding: 0;
    background-color: ${props => localStorage.theme !== 'dark' ? props.theme.primaryBack : props.theme.secundaryBack};
`

if (!localStorage.theme) localStorage.setItem('theme', 'ligth');

function App() {
  const reduxState = useSelector(state => state.themeReducer.theme);
  const dispatch = useDispatch()
  const [state, setState] = useState(false);
  const [thema, setTheme] = useState('');
  useEffect(() => {
    let changeRedux = () => {
      setTheme(reduxState)
    }
    changeRedux();
    dispatch(getVideogames());
  }, [thema])

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar setState={setState} state={state} />
        <Routes>
          <Route path='/' element={state ? null : <Videogames />} />
          <Route path='/create' element={state ? null : <CreateGame />} />
          <Route path='/about' element={state ? null : <About />} />
          <Route path='/detail' element={state ? null : <h2>Aca vendrian los detalles del juego</h2>} />
          <Route path='/search' element={state ? null : <SearchGames />} />
        </Routes>
        {state ? null : <Footer />}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
