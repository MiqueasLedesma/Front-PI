import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Stars } from './Stars'

const CardContainer = styled.div`
    .card {
        border: none;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 90%;
        &:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            width: 100%;
        }
        .container {
            padding: 2px 16px;
            background-color: gray;
        }
    }

`
export const Card = ({ name, image, rating }) => {
    const navigate = useNavigate();
    const handleClick = e => {
        navigate('/detail');
    }
    return (
        <CardContainer onClick={handleClick}>
            <br />
            <div className="card">
                <img src={image} alt="Avatar" style={{ width: '100%' }} />
                <div className="container">
                    <Stars rating={rating} />
                    <h4><b>{name}</b></h4>
                </div>
            </div>
            <br />
        </CardContainer>
    )
}
