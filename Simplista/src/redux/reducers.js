import { SET_LIST, SET_LIST_ID } from './actions';

const initialState = {
    list: [],
    listId: 1,
}

function smpList(state = initialState, action) {
    switch (action.type) {
        case SET_LIST:
            return { ...state, list: action.payload };
        case SET_LIST_ID:
            return { ...state, listId: action.payload };
        default:
            return state;
    }
}

export default smpList;