import axios, { AxiosResponse } from 'axios';
import { getDomainsFailure, getDomainsRequest, getDomainsSuccess } from './domainActions';
import { Dispatch } from 'redux';

export const getDomains = (domain: string) => {
  return (dispatch: Dispatch) => {
    dispatch(getDomainsRequest());
    axios
      .get(`https://api.domainsdb.info/v1/domains/search?limit=50&domain=${domain}`)
      .then((response: AxiosResponse) => {
        dispatch(getDomainsSuccess(response.data.domains));
      })
      .catch((error: any) => {
        dispatch(getDomainsFailure(error.response.data.message));
      });
  };
};
