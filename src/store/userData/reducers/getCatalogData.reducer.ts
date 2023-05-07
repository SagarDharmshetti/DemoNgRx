import * as fromData from '../actions/getCatalogData.action';
export interface DataState {
  products: string[];
  catalogLoading: boolean;
  error: any;
}
export const initialState: DataState = {
  products: [],
  catalogLoading: false,
  error: null,
};

export function reducer(state: any, action: any): DataState {
  switch (action.type) {
    case fromData.ActionTypes.DataLoadBegin: {
      return {
        ...state,
        catalogLoading: true,
        error: null,
      };
    }
    case fromData.ActionTypes.DataLoadSuccess: {
      return {
        ...state,
        catalogLoading: false,
        items: action.payload.data,
      };
    }
    case fromData.ActionTypes.DataLoadFailure: {
      return {
        ...state,
        catalogLoading: false,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}

export const getProductData = (state: DataState) => state.products;
