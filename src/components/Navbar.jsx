import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../index';
import { changeTheme } from '../redux/actions/themeActions';
import { getSearchGames } from '../redux/actions/videogamesActions';
import { MenuIcon } from './MenuIcon';
import moon_logo from '../images/moon.png';
import sun_logo from '../images/sun.png';

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
        ${MyLink}{
            transition: 300ms ease;
            user-select: none;
            color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
            font-size: 2rem;
            display: block;
            padding: 0.8rem;
            &:hover{
                background-color: #04AA6D;
                border-radius: 10px;
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
                transition: 300ms ease;
                &:hover {
                    background-color: #00f1ff;
                }
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
            color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
        }
    }
`
const BgDiv = styled.div`
    position: absolute;
    background-color: ${props => localStorage.theme !== 'dark' ? props.theme.primaryBack : props.theme.secundaryBack};
    top: -700px;
    left: -1000px;
    width: 100vw;
    height: 100vh;
    z-index: -1;
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
        if(input === '') return;
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
        handleClick()
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
                <MyLink to={'/games'} onClick={handleClick}><h2>App <span>Videogames!</span></h2></MyLink>
                <div className={`links ${clicked ? 'active' : null}`} active>
                    <MyLink to={'/create'} onClick={handleClick}><strong>Create</strong></MyLink>
                    <MyLink onClick={handleTheme}>{
                        darkmode === 'ligth'
                            ?
                            <img src={sun_logo} style={{ width: '1.6rem' }} alt="" />
                            :
                            <img src={moon_logo} style={{ width: '1.6rem' }} alt="" />
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
