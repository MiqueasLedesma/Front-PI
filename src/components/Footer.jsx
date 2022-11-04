import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { theme } from '../index'
import footer_logo from '../images/footer-logo.png';
import linkedin_logo from '../images/linkedin-logo.svg';
import github_logo from '../images/github-logo.svg';
import react_logo from '../images/react-logo.svg';
import redux_logo from '../images/redux-logo.svg';
import html_logo from '../images/html-logo.svg';
import css_logo from '../images/css-logo.svg';
import styled_logo from '../images/styled-logo.svg';
import postgresql_logo from '../images/postgresql-logo.svg';
import nodejs_logo from '../images/nodejs-logo.svg';

const Box = styled.div`
`
const Group1 = styled.div`
`
const Group2 = styled.div`
`

const FooterContainer = styled.div`
    position: relative;
    bottom: 0;
    width: 100%;
    footer {
        width: 100%;
        background-color: ${props => localStorage.theme !== 'dark' ? props.theme.primary : props.theme.secundary};
    }
    ${Group1}{
        width: 100%;
        max-width: 1200px;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(3 , 1fr);
        grid-gap: 50px;
        padding: 45px 0px;
        @media screen and (max-width:768px) {
            width: 50%;
            display: grid;
            grid-template-columns: repeat(1 , 1fr);
            grid-gap: 30px;
            padding: 35px 0px;
        }
    }
    ${Box} {
        figure {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 150px;
            }

        }
        h2 {
            color: white;
            margin-bottom: 25px;
            font-size: 20px;
        }
        p {
            color: #efefef;
            margin-bottom: 10px;
            img {
                width: 25px;
            }
        }
        a {
            padding: 10px;
            img {
                width: 50px;
                transition: all 300ms ease;
                &:hover {
                    width: 70px;
                }
            }
        }
    }
    ${Group2} {
        background-color: #0a1a2a;
        padding: 15px 10px;
        color: white;
        text-align: center;
    }

`

export const Footer = () => {

    const reduxState = useSelector(state => state.themeReducer.theme);
    const [state, setState] = useState('');

    useEffect(() => {
        let changeRedux = () => {
            setState(reduxState)
        }
        changeRedux();
    }, [state])

    return (
        <ThemeProvider theme={theme}>
            <FooterContainer>
                <footer>
                    <Group1 className="group-1">
                        <Box>
                            <figure>
                                <img src={footer_logo} alt="img" />
                            </figure>
                        </Box>
                        <Box className="box">
                            <h2>Used technology:</h2>
                            <p>
                                Front-end: <br />
                                <img src={react_logo} alt="" />
                                <img src={redux_logo} alt="" />
                                <img src={html_logo} alt="" />
                                <img src={css_logo} alt="" />
                                <img src={styled_logo} alt="" />
                            </p>
                            <p>
                                Back-end: <br />
                                <img src={postgresql_logo} alt="" />
                                <img src={nodejs_logo} alt="" />
                                Express.js
                            </p>
                        </Box>
                        <Box className="box">
                            <h2>My social networks:</h2>
                            <a href='https://www.linkedin.com/in/miqueas-ledesma-08a106246/' target='_blank'><img src={linkedin_logo} alt="img" /></a>
                            <a href='https://github.com/MiqueasLedesma' target='_bla'><img src={github_logo} alt="img" /></a>

                        </Box>
                    </Group1>
                    <Group2 className="group-2">
                        <small>
                            copyright© 2022: <b>Miqueas Ledesma</b> - All rights reserved
                        </small>
                    </Group2>
                </footer>
            </FooterContainer>
        </ThemeProvider>
    )
}
