export interface IAction {
  /**
   * Dispatched action type
   */
  type: string;
  /**
   * Payload send with dispatch action
   */
  payload?: any;
}
