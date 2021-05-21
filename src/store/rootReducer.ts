/**
 * It is root for store reducer
 */
import { combineReducers } from 'redux';
import { IRootReducerState } from './IRootReducer';
import domainReducer from './Domains/domainReducer';

const rootReducer = combineReducers<IRootReducerState>({
  domains: domainReducer,
});

export default rootReducer;
