import { CHANGE_THEME } from "../actions/themeActions";

const initialState = {
    theme: ''
};

export default function themeReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.payload
            };
        default: return state;
    };
};