import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { getVideogames } from '../redux/actions/videogamesActions';

const PaginateContainer = styled.div`
    text-align: center;
    .pagination {
        display: inline-block;
        button {
            border: none;
            background-color: #4CAF50;
            color: white;
            float: left;
            padding: 6px 14px;
            text-decoration: none;
            transition: 300ms ease;
            @media screen and (max-width: 768px) {
                padding: 4px 10px;
                &:hover {
                    padding: 6px 14px;
                    background-color: #00f1ff;
                }
            }
            &.active {
                background-color: #212921;
                color: white;
            }
            &:hover {
                padding: 8px 16px;
                background-color: #00f1ff;
            }
        }
    }
`

export const Pagination = () => {
    const dispatch = useDispatch();
    const reduxState = useSelector(state => state.videogamesReducer.videogames);
    const reduxState2 = useSelector(state => state.videogamesReducer.page);
    const toRender = reduxState.pages;
    const [currentPage, setCurrentPage] = useState('0');

    const handleClick = (e) => {
        e && setCurrentPage(e.target.value);
        e && dispatch(getVideogames(e.target.value));
        return window.scrollTo(0, -1000);
    }

    const paginate = (pages) => {
        let arr = [];
        for (let i = 0; i < pages; i++) {
            arr.push(<button key={i} onClick={handleClick} className={reduxState2 == i ? 'active' : ''} value={i}>{i + 1}</button>)
        }
        return arr;
    }

    return (
        <PaginateContainer>
            <div className='pagination'>
            {toRender && paginate(toRender)}
            </div>
        </PaginateContainer>
    )
}
