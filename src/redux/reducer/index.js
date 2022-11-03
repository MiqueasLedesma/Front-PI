import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import videogamesReducer from './videogamesReducer';

export default combineReducers({
    themeReducer,
    videogamesReducer
});