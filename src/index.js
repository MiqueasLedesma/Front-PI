import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import landingImage from './images/LandingImage.jpg';

export const theme = {
  primary: 'black',
  secundary: 'gray',
  primaryBack: '#00313f',
  secundaryBack: '#ccd7ed',
  letterPrimary: 'white',
  letterSecundary: 'black',
  landingImage: landingImage
}

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>


  ,
  document.getElementById('root')
);
