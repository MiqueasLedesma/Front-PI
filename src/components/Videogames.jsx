import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { Pagination } from './Pagination';
import loader_logo from '../images/loader.gif';
import { Card } from './Card';

const CardsContainers = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4 , 1fr);
    grid-gap: 10px;
    @media screen and (max-width:768px) {
        grid-template-columns: repeat(2 , 1fr);
    }
`


export const Videogames = () => {

    const reduxState = useSelector(state => state.videogamesReducer.videogames);
    const toRender = reduxState.content && reduxState.content.map(e => {
        return {
            name: e.name,
            image: e.image,
            rating: e.rating
        }
    })


    if (!reduxState.content) return (
        <img src={loader_logo} style={{ width: `${window.innerWidth}px` }} alt={loader_logo} />
    )

    return (
        <div style={{textAlign: 'center'}}>
            <CardsContainers >
                {toRender && toRender.map(e =>
                    <div>
                        <Card name={e.name} image={e.image} rating={e.rating} />
                    </div>
                )}
            </CardsContainers>
            <Pagination />
        </div>
    )
}
