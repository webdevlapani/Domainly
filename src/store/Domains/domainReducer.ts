import { IAction } from '../IAction';
import {
  GET_DOMAINS_REQUEST,
  GET_DOMAINS_REQUEST_FAILURE,
  GET_DOMAINS_REQUEST_SUCCESS,
} from './domainTypes';
import { IDomain } from './IDomain';

export interface IDomainsState {
  loading: boolean;
  domains: IDomain[];
  error: string;
}

const initialState: IDomainsState = {
  loading: false,
  domains: [],
  error: '',
};

const domainReducer = (state = initialState, action: IAction): IDomainsState => {
  switch (action.type) {
    case GET_DOMAINS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_DOMAINS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        domains: action.payload,
        error: '',
      };
    case GET_DOMAINS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        domains: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default domainReducer;
