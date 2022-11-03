import React from 'react'
import { FaStar } from 'react-icons/fa'
import styled from 'styled-components'

const StarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${FaStar} {
        margin-right: 10;
        user-select: none;
    }

`


export const Stars = ({ rating }) => {
    let stars = Array(Math.ceil(rating)).fill(0)
    return (
        <StarContainer>
            <div>
                {
                    stars && stars.map((e, index) => <FaStar key={index} size={24} color={'orange'} />)
                }
            </div>
        </StarContainer>
    )
}
