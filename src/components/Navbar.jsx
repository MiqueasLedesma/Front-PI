import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../index'
import { changeTheme } from '../redux/actions/themeActions'
import { getSearchGames } from '../redux/actions/videogamesActions'
import { MenuIcon } from './MenuIcon'

const MyLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin-right: 0;
    margin-left: 0;
`

const NavContainer = styled.nav`
    z-index: -1;
    h2 {
        user-select: none;
        color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
        font-weight: 400;
        span{
            user-select: none;
            font-weight: bold;
        }
    }
    padding: .2rem;
    background-color: ${props => localStorage.theme !== 'dark' ? props.theme.primary : props.theme.secundary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu {
        @media(min-width: 768px){
            display: none;
        }
    }
    .links {
        position: absolute;
        top: -700px;
        left: -2000px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        /* transition: all .5s ease; */
        ${MyLink}{
            user-select: none;
            color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
            font-size: 2rem;
            display: block;
            padding: 0.8rem;
            &:hover{
                background-color: #04AA6D;
            }
            span {
                border-radius: 50%;
                user-select: none;
                font-weight: bold;
            }
        }
        form {
            display: inline;
            input {
                height: 2rem;
            }
            button {
                height: 2rem;
                background-color: #4CAF50;
                border: none;
                color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
                text-align: center;
                text-decoration: none;
                font-size: 16px;
                cursor: pointer;
            }
        }
        @media(min-width: 768px){
            position: initial;
            margin: 0;
            ${MyLink}{
                font-size: 1rem;
                display: inline;
            }
        }
    }
    .links.active {
        width: 100%;
        display: block;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        top: 30%;
        left: 0;
        right: 0;
        text-align: center;
        ${MyLink}{
            font-size: 2rem;
            margin-bottom: 1rem;
            color: white;
        }
    }
`
const BgDiv = styled.div`
    position: absolute;
    background-color: #222;
    top: -700px;
    left: -1000px;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    /* transition: all .6s ease; */
    &.active {
        border-radius: 0 0 0 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

export const Navbar = ({ state, setState }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [clicked, setClick] = useState(false);
    const [darkmode, setDarkmode] = useState(localStorage.theme);
    const [input, setInput] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(getSearchGames(input));
        setInput('');
        navigate('/search');
        setClick(false);
        setState(false);
        
    };

    const handleClick = e => {
        setClick(false);
        setState(false);
    }

    const handleChange = e => {
        setInput(e.target.value);
    }


    const handleTheme = () => {

        if (localStorage.theme === 'ligth') {
            window.localStorage.setItem('theme', 'dark');
            dispatch(changeTheme())
            return setDarkmode(localStorage.theme);
        }
        else {
            window.localStorage.setItem('theme', 'ligth');
            dispatch(changeTheme())
            return setDarkmode(localStorage.theme);
        }
    }


    if (window.innerWidth > 768 && clicked) setClick(!clicked);
    const reduxState = useSelector(state => state.videogamesReducer.searchGames);
    if (reduxState === 0) navigate('/');

    return (
        <ThemeProvider theme={theme}>
            <NavContainer>
                <MyLink to={'/'} onClick={handleClick}><h2>App <span>Videogames!</span></h2></MyLink>
                <div className={`links ${clicked ? 'active' : null}`} active>
                    <MyLink to={'/create'} onClick={handleClick}>Create</MyLink>
                    {/* <MyLink to={'/about'} onClick={handleClick}>About</MyLink> */}
                    <MyLink onClick={handleTheme}>{darkmode === 'ligth' ?
                        <span className="material-symbols-outlined">
                            light_mode
                        </span>
                        :
                        <span className="material-symbols-outlined">
                            dark_mode
                        </span>
                    }</MyLink>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={input} onChange={handleChange} />
                        <button>Search</button>
                    </form>
                </div>
                <div className='menu'>
                    <MenuIcon setValue={setClick} value={clicked} state={state} setState={setState} />
                </div>
                <BgDiv className={`initial ${clicked ? 'active' : null}`}></BgDiv>
            </NavContainer>
        </ThemeProvider>
    )
}
