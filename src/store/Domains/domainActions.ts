import {
  GET_DOMAINS_REQUEST,
  GET_DOMAINS_REQUEST_FAILURE,
  GET_DOMAINS_REQUEST_SUCCESS,
} from './domainTypes';
import { IDomain } from './IDomain';
import { IAction } from '../IAction';

export const getDomainsRequest = (): IAction => {
  return {
    type: GET_DOMAINS_REQUEST,
  };
};

export const getDomainsSuccess = (domains: IDomain): IAction => {
  return {
    type: GET_DOMAINS_REQUEST_SUCCESS,
    payload: domains,
  };
};

export const getDomainsFailure = (error: string): IAction => {
  return {
    type: GET_DOMAINS_REQUEST_FAILURE,
    payload: error,
  };
};
