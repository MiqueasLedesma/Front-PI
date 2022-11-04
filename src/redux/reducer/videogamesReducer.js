import { GET_SEARCH_GAMES, GET_VIDEOGAMES } from "../actions/videogamesActions";

const initialState = {
    videogames: [],
    page: 0,
    searchGames: [],
    search: false
};

console.log(initialState.search)

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

            }
        default:
            return state;
    };
};

