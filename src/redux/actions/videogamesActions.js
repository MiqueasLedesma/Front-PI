import axios from "axios";

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';

export const getVideogames = (page) => async (dispatch) => {
    window.scrollTo(0, -1000);
    try {
        dispatch({
            type: GET_VIDEOGAMES,
            payload: [],
            page: page || 0
        })
        axios.get(`https://miqueaswebapi.onrender.com/videogames?page=${page || 0}`)
            .then(r => {
                return dispatch({
                    type: GET_VIDEOGAMES,
                    payload: r.data,
                    page: page || 0
                })
            })
    } catch (error) {
        console.log(error.message);
    }
}