import { GET_SEARCH_GAMES, GET_VG_ID, GET_VIDEOGAMES } from "../actions/videogamesActions";

const initialState = {
    videogames: [],
    page: 0,
    searchGames: [],
    search: false,
    detail: []
};

export default function videogamesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                page: action.page
            };
        case GET_SEARCH_GAMES:
            return {
                ...state,
                searchGames: action.payload,

            };
        case GET_VG_ID: 
        return {
            ...state,
            detail: action.payload
        }
        default:
            return state;
    };
};

