import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../index';
import loader_logo from '../images/loader.gif';
import { Navigate } from 'react-router-dom';

const DetailContainer = styled.div`
    width: 100%;
    text-align: center;
    color: ${props => localStorage.theme !== 'dark' ? props.theme.letterPrimary : props.theme.letterSecundary};
    img {
        width: 800px;
        @media screen and (max-width:768px) {
            width: 90%;
        }
    }
    p {
        text-align: center;
        margin-left: 2rem;
        margin-right: 2rem;
    }
`

export const Detail = () => {

    const reduxState = useSelector(state => state.videogamesReducer.detail);

    let loading = Array.isArray(reduxState)

    if (loading) return <img src={loader_logo} style={{ width: `${window.innerWidth}px` }} alt={loader_logo} />
    
    if(typeof(reduxState) === 'string') return <Navigate to={'/'} />;

    return (
        <ThemeProvider theme={theme}>
            <DetailContainer>
                <br />
                <h2>{reduxState.name}</h2>
                <img src={reduxState.image} alt="img" />
                <h5>Platforms: {reduxState.platforms.join(' ')}</h5>
                {/* <h5>Genres: {reduxState.genres.map(e => e.name).join(' ')}</h5> */}
                <br />
                <p>{reduxState.description}</p>
            </DetailContainer>
        </ThemeProvider>
    )
}
