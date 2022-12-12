export const SET_LIST = 'SET_LIST';
export const SET_LIST_ID = 'SET_LIST_ID';

export const setList = list => dispatch => {
    dispatch({
        type: SET_LIST,
        payload: list,
    });
};

export const setListID = listId => dispatch => {
    dispatch({
        type: SET_LIST_ID,
        payload: listId,
    });
};