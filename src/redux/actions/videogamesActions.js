import axios from "axios";
import Swal from "sweetalert2";

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VG_ID = 'GET_VG_ID';
export const GET_SEARCH_GAMES = 'GET_SEARCH_GAMES';

export const getVideogames = obj => async dispatch => {
    window.scrollTo(0, -2000);
    const { page, category, param, sort } = obj;
    try {
        dispatch({
            type: GET_VIDEOGAMES,
            payload: [],
            page: page || 0,
        })
        axios.get(`https://miqueaswebapi.onrender.com/videogames/filter?page=${page || 0}${category ? '&category=' + category : ''}${param ? '&type=' + param : ''}${sort ? '&sort=' + sort : ''}`)
            .then(r => {
                if (r.data.content.length === 0) return Swal.fire({
                    title: "No match",
                    text: "The database don't have any game like that!",
                    type: "success"
                }).then(() => window.history.go('/games'))
                return dispatch({
                    type: GET_VIDEOGAMES,
                    payload: r.data,
                    page: page || 0,
                    category: category || false,
                    param: param || false,
                    sort: sort || false
                })
            })
    } catch (error) {
        console.log(error.message)
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
            payload: []
        })
        await axios.get(`https://miqueaswebapi.onrender.com/videogames/search?name=${name}`)
            .then(r => {
                if (r.data.length === 0) {
                    return Swal.fire({
                        title: "Videogame not founded!",
                        text: "is not here :(!",
                        type: "success"
                    }).then(() => window.history.go('/games'))
                }
                return dispatch({
                    type: GET_SEARCH_GAMES,
                    payload: r.data
                })
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const postGame = obj => async () => {
    console.log(obj)
    try {
        await axios.post('https://miqueaswebapi.onrender.com/videogames', obj)
            .then(r => Swal.fire({
                title: "Succes!",
                text: r.data,
                type: "Succes"
            }))
    } catch (error) {
        console.log(error.message);
        return Swal.fire({
            title: "Fail",
            text: error.message,
            type: "error"
        })
    }
}