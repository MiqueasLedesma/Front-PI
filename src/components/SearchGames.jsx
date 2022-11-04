import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from './Card';
import { CardsContainers } from './Videogames';
import loader_logo from '../images/loader.gif';
import { useNavigate } from 'react-router-dom';


export const SearchGames = () => {
    const navigate = useNavigate();
    const reduxState = useSelector(state => state.videogamesReducer);

    if (!reduxState.searchGames[0] && !reduxState.search) navigate('/')

    if (!reduxState.searchGames[0] ) {
        return (<img src={loader_logo} style={{ width: `${window.innerWidth}px` }} alt={loader_logo} />)
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <CardsContainers>
                {
                    reduxState.searchGames[0] && reduxState.searchGames.map((e) => <Card name={e.name} image={e.image} rating={e.rating} id={e.id} />)
                }
            </CardsContainers>
        </div>
    )

}
