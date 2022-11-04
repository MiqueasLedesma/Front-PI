import axios from "axios";
import Swal from "sweetalert2";


export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VG_ID = 'GET_VG_ID';
export const GET_SEARCH_GAMES = 'GET_SEARCH_GAMES';

export const getVideogames = page => async dispatch => {
    window.scrollTo(0, -2000);
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

export const getGamesById = id => async dispatch => {
    window.scrollTo(0, -2000);
    try {
        dispatch({
            type: GET_VG_ID,
            payload: []
        })
        axios.get(`https://miqueaswebapi.onrender.com/videogames/detail?id=${id}`)
            .then(r => {
                return dispatch({
                    type: GET_VG_ID,
                    payload: r.data
                })
            })
    } catch (error) {
        console.log(error.message);
    }
}

export const getSearchGames = name => async dispatch => {
    window.scrollTo(0, -2000);
    try {
        dispatch({
            type: GET_SEARCH_GAMES,
            payload: [],
            search: false
        })
        await axios.get(`https://miqueaswebapi.onrender.com/videogames/search?name=${name}`)
            .then(r => {
                if (r.data.length === 0) {
                    return Swal.fire({
                        title: "Videogame not founded!",
                        text: "is not here :(!",
                        type: "success"
                    }).then(() => window.history.go('/'))
                }
                return dispatch({
                    type: GET_SEARCH_GAMES,
                    payload: r.data,
                    search: true
                })
            })
        // .then(window.history.go('/search'))
    } catch (error) {
        console.log(error.message)
    }
}