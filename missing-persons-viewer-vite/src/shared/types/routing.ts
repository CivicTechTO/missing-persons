import { Params } from 'react-router-dom';

export interface Action {
  request: Request;
  params: Params;
}
