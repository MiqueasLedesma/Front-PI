import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';

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

export const Pagination = ({ state, setState }) => {
    const reduxState = useSelector(e => e.videogamesReducer.videogames);
    const currentPage = useSelector(e => e.videogamesReducer.page);
    const toRender = reduxState.pages;
    const handleClick = (e) => {
        window.scrollTo(0, -1000);
        setState({
            ...state,
            page: e.target.value
        });
    }

    const paginate = (pages) => {
        let arr = [];
        for (let i = 0; i < pages; i++) {
            arr.push(<button key={i} onClick={handleClick} className={currentPage == i ? 'active' : ''} value={i}>{i + 1}</button>)
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
