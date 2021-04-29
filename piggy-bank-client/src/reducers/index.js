import balanceReducer from './balance';
import idReducer from './id';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    balance: balanceReducer,
    id: idReducer
});

export default allReducers;