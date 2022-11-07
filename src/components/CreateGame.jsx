import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import Swal from 'sweetalert2';
import { theme } from '../index';
import { postGame } from '../redux/actions/videogamesActions';

const FormContainer = styled.div`
    width: 100%;
    height: 25rem;
    h2 {
      font-weight: 800;
    }
    text-align: center;
    form {
      color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
      .submit {
          height: 2.5rem;
          background-color: #4CAF50;
          transition: 300ms ease;
          border: none;
          color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          cursor: pointer;
          border-radius: 15px;
          &:hover {
              background-color: red;
          }
        }
      .gender {
        border: 2px solid black;
      }
      .platforms{
        border: 2px solid black;
      }
    }
`

export const CreateGame = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({});
  const [genres, setgenres] = useState([]);
  const plats = ['PC', 'XBOX', 'PS5', 'NINTENDO', 'WEB', 'OTHERS'];
  const rating = [1, 2, 3, 4, 5];

  useEffect(() => {
    axios.get('https://webapivideogames-miqueas.herokuapp.com/genres')
      .then(r => setgenres(r.data))
  }, []);

  const handleSelects = e => {
    if (state[e.target.name]) {
      let filter = state[e.target.name].filter(value => e.target.value === value);
      if (filter.length !== 0) return;
    }
    !state[e.target.name] ?
      setState({
        ...state,
        [e.target.name]: [e.target.value]
      }) :
      setState({
        ...state,
        [e.target.name]: state[e.target.name].concat(e.target.value)
      });
  };

  const handleClick = e => {
    e.preventDefault();
    if (typeof (state[e.target.name]) === 'string') {
      return setState({
        ...state,
        [e.target.name]: null
      })
    }
    let newValue = state[e.target.name].filter(value => value !== e.target.value);
    return setState({
      ...state,
      [e.target.name]: newValue
    })
  }

  const handleChange = e => {
    return setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleRating = e => {
    return setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    let errors = [];
    e.preventDefault();
    if (!state.platforms || !state.genres || !state.platforms[0] || !state.rating || !state.description || !state.name) errors.push('form is incomplete');
    if (state.genres && state.genres.length < 2) errors.push('must select almost 2 genres');
    if (state.description && state.description.length <= 10) errors.push('description must have more than 10 characters')
    if (errors.length !== 0) {
      return Swal.fire({
        title: "Fail!",
        text: `${errors.join(' - ')}`,
        type: "error"
      })
    }
    dispatch(postGame(state));
    setState({});
  }


  return (
    <ThemeProvider theme={theme}>
      <FormContainer><br />
        <form onSubmit={handleSubmit}>
          <h2>CREATE NEW GAME!</h2>
          {/* ---NAME--- */}
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" name="name" onChange={handleChange} />
          <br />
          {/* ---DESCRIPTION--- */}
          <label htmlFor="description">Description</label>
          <br />
          <input type="text" name="description" onChange={handleChange} />
          <br />
          <br />
          {/* ---platformsS--- */}
          <select name="platforms" value='none' onChange={handleSelects}>
            <option selected>platformss</option>
            {plats && plats.map((e, index) => <option key={index} value={e} >{e}</option>)}
          </select>
          {state.platforms && state.platforms.map((e, index) => <button className='platforms' name='platforms' key={index} onClick={handleClick} value={e}>{e}</button>)}
          <br />
          <br />
          {/* ---genres--- */}
          <select name="genres" value='none' onChange={handleSelects}>
            <option selected>genres</option>
            {genres && genres.map((e, index) => <option key={index} value={e}>{e}</option>)}
          </select>
          {state.genres && state.genres.map((e, index) => <button className='gender' name='genres' key={index} onClick={handleClick} value={e}>{e}</button>)}
          <br />
          <br />
          {/* ---RATING--- */}
          <select name='rating' onChange={handleRating}>
            <option value={null} selected>Rating</option>
            {rating && rating.map((e, index) => <option key={index} value={e}>{e}</option>)}
          </select>
          {/* {state.rating && <button name='rating' onClick={handleClick} key={1}>{state.rating}</button>} */}
          <br />
          <br />
          {/* ---SUBMIT--- */}
          <button className='submit'>Submit</button>
        </form>
      </FormContainer>
    </ThemeProvider>

  )
}