import React from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0 , .5);
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContainerModal = styled.div`
    width: 500px;
    min-height: 100px;
    background-color: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 20px;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8;

    h3 {
        font-weight: 500;
        font-size: 16px;
        color: #1766dc
    }
`

const ButtonClose = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    border: none;
    background:none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #1766DC;

    &:hover{
        background: #f2f2f2;
    }

    span{
        width: 100%;
        height: 100%;
    }
`

export const DetailModal = ({ children, handleClose }) => {
    const handleClick = (e) => {
        e.preventDefault();
        handleClose(false)
    };
    return (
        <>
            <Overlay>
                <ContainerModal>
                    <Header>
                        <h3>Titulo</h3>
                    </Header>

                    <ButtonClose onClick={handleClick}>
                        <span class="material-symbols-outlined">
                            close
                        </span>
                    </ButtonClose>

                    {children}

                </ContainerModal>

            </Overlay>
        </>
    )
}
