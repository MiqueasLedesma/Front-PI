export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = () => async (dispatch) => {
    return dispatch({
        type: CHANGE_THEME,
        payload: localStorage.theme === 'dark' ? 'light' : 'dark'
    })
}