/**
 * Register root reducer state here
 */
import { IDomainsState } from './Domains/domainReducer';

export interface IRootReducerState {
  /**
   * Domains Reducer state
   */
  domains: IDomainsState;
}
