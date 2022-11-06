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
    @media screen and (max-width:768px) {
        display: table-row;
    }
    h4 {
        font-weight: 600;
        display: inline;
        color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
        @media screen and (max-width:768px) {
            display: none;
        }
    }
    select {
        width: fit-content;
        min-height: 2.45rem;
        outline: none;
        padding: 5px;
        cursor: pointer;
        margin-top: 5px;
        appearance: none;
    }
    button {
        height: 2.45rem;
        background-color: #4CAF50;
        border: none;
        color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        cursor: pointer;
    }
`

export const Filters = ({ state, setState }) => {
    const [genres, setGenres] = useState([]);
    useEffect(async () => {
        await axios.get('https://webapivideogames-miqueas.herokuapp.com/genres')
            .then(r => setGenres(r.data))
    }, [])

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
                    </select>
                    <button onClick={() => setState({page:0})}>Reset Filters</button>
            </FilterContainer>
        </ThemeProvider>
    )
}
