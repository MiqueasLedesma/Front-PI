import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from './Card';
import { CardsContainers } from './Videogames';
import loader_logo from '../images/loader.gif';
import { Navigate } from 'react-router-dom';



export const SearchGames = () => {

    const reduxState = useSelector(state => state.videogamesReducer.searchGames);

    let loading = Array.isArray(reduxState)

    if (loading && !reduxState[0]) return <img src={loader_logo} style={{ width: `${window.innerWidth}px` }} alt={loader_logo} />

    if (typeof (reduxState) === 'string') return <Navigate to={'/'} />;

    return (
        <div style={{ textAlign: 'center' }}>
            <CardsContainers>
                {
                    Array.isArray(reduxState) && reduxState.map((e) => <Card name={e.name} image={e.image} rating={e.rating} id={e.id} />)
                }
            </CardsContainers>
        </div>
    )

}
