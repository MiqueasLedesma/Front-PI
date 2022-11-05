import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../index';

const FormContainer = styled.div`
    width: 100%;
    height: 25rem;
    h2 {
      font-weight: 800;
    }
    text-align: center;
    form {
      color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
      button {
        height: 1.6rem;
        background-color: #4CAF50;
        border: none;
        color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
        text-align: center;
        text-decoration: none;
        font-size: 1rem;
        cursor: pointer;
      }
      .submit {
          
        }
        .gender {
          border: 2px solid black;
        }
        .platform{
          border: 2px solid black;
        }
    }
`

export const CreateGame = () => {

  const [state, setState] = useState({});

  const plats = ['PC', 'XBOX', 'PS5', 'NINTENDO', 'OTHERS'];
  const genders = ['ACTION', 'SHOOTER', 'ADVENTURES', 'RPG', 'STRATEGY'];
  const rating = [1, 2, 3, 4, 5];

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
    if (!state.platform || !state.genders || !state.platform[0] || !state.rating || !state.description || !state.name) errors.push('form is incomplete');
    if (state.genders && state.genders.length < 2) errors.push('must select almost 2 genders');
    if (state.description && state.description.length <= 10) errors.push('description must have more than 10 characters')
    if (errors.length !== 0) {
      return alert(`${errors.join(' - ')}`)
    }
    setState({});
    window.history.go('/');
    return alert('succes!');
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
          {/* ---PLATFORMS--- */}
          <select name="platform" value='none' onChange={handleSelects}>
            <option selected>Platforms</option>
            {plats && plats.map((e, index) => <option key={index} value={e} >{e}</option>)}
          </select>
          {state.platform && state.platform.map((e, index) => <button className='platform' name='platform' key={index} onClick={handleClick} value={e}>{e}</button>)}
          <br />
          <br />
          {/* ---GENDERS--- */}
          <select name="genders" value='none' onChange={handleSelects}>
            <option selected>Genders</option>
            {genders && genders.map((e, index) => <option key={index} value={e}>{e}</option>)}
          </select>
          {state.genders && state.genders.map((e, index) => <button className='gender' name='genders' key={index} onClick={handleClick} value={e}>{e}</button>)}
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