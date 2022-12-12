import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import smpList from './reducers';

const rootReducer = combineReducers({smpList});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
