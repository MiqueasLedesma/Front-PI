import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../index';

const FilterContainer = styled.div`
    text-align: center;
    display: inline-block;
    margin: 5px;
    h4 {
        font-weight: 600;
        display: inline;
        color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
        @media screen and (max-width:768px) {
            display: none;
        }
    }
    select {
        cursor: pointer;
        width: fit-content;
        min-height: 1rem;
        outline: none;
        padding: 5px;
        margin-top: 5px;
        appearance: none;
        border-radius: 5px;
        font-size: 1rem;
        @media screen and (max-width:768px) {
            font-size: .8rem;
        }
    }
    button {
        height: 2.5rem;
        background-color: #4CAF50;
        transition: 300ms ease;
        border: none;
        color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        border-radius: 15px;
        cursor: pointer;
        &:hover {
            background-color: red;
        }
        @media screen and (min-width:768px) {
                display: none;
            }
    }
`
const Button = styled.button`
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
    @media screen and (max-width:768px) {
                display: none;
            }
`

export const Filters = ({ state, setState }) => {
    const [genres, setGenres] = useState([]);
    useEffect(async () => {
        await axios.get('https://miqueaswebapi.onrender.com/genres')
            .then(r => setGenres(r.data))
    }, [state])

    const order = ['ASC', 'DESC'];

    const type = ['rating', 'name'];

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            page: 0
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <FilterContainer>
                <h4>Filter:  </h4>
                <select name="category" onChange={handleChange} id="">
                    <option value="">Genre{state.category && `: ${state.category}`}</option>
                    {Array.isArray(genres) && genres.map((e, index) => <option key={index} value={e}>{e}</option>)}
                </select>
                <select name="param" onChange={handleChange} id="">
                    <option value="">Sort by{state.param && `: ${state.param}`}</option>
                    {type && type.map((e, index) => <option key={index} value={e}>{e}</option>)}
                </select>
                <select name="sort" onChange={handleChange} id="">
                    <option value="">Order{state.sort ? `: ${state.sort}` : ': DESC'}</option>
                    {order && order.map((e, index) => <option key={index} value={e}>{e}</option>)}
                </select><br />
                <button onClick={() => setState({ page: 0 })}>Reset Filters</button>
            </FilterContainer>
            <Button onClick={() => setState({ page: 0 })}>Reset Filters</Button>
        </ThemeProvider>
    )
}
