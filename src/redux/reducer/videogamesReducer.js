import { GET_VIDEOGAMES } from "../actions/videogamesActions";

const initialState = {
    videogames: [],
    page: 0
};

export default function videogamesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                page: action.page
            };
        default: return state;
    };
};

