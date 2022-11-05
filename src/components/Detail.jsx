import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import loader_logo from '../images/loader.gif';

const DetailContainer = styled.div`
    width: 100%;
    text-align: center;
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
    console.log(reduxState);

    let loading = Array.isArray(reduxState)

    if (loading) return <img src={loader_logo} style={{ width: `${window.innerWidth}px` }} alt={loader_logo} />

    return (
        <ThemeProvider>
            <DetailContainer>
                <br />
                <img src={reduxState.image} alt="img" />
                <br />
                <p>{reduxState.description}</p>
            </DetailContainer>
        </ThemeProvider>
    )
}
