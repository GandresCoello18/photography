import { Dispatch } from "redux";

/// CONSTANTES

export interface initialData {
  results: Array<any>;
  search: string;
  total: number;
  total_pages: number;
  loading: boolean;
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const initialData: initialData = {
  results: [],
  search: "",
  total: 0,
  total_pages: 0,
  loading: true,
  error: "",
};

const SET_SEARCH = "SET_SEARCH";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
}

/// ACTIONS

export const SetSearch = (search: initialData) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_SEARCH,
    payload: search,
  });
};
