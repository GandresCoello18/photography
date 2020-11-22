import { Dispatch } from "redux";

/// CONSTANTES

export interface initialData {
  photos: Array<any>;
  loading: boolean;
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const initialData: initialData = {
  photos: [],
  loading: true,
  error: "",
};

const SET_LIST_PHOTOS = "SET_LIST_PHOTOS";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case SET_LIST_PHOTOS:
      return { ...state, photos: action.payload, loading: false };
    default:
      return state;
  }
}

/// ACTIONS

export const SetPhotos = (list: Array<any>) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_LIST_PHOTOS,
    payload: list,
  });
};
