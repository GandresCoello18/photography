import { Dispatch } from "redux";

/// CONSTANTES

export interface initialData {
  LikesPhoto: Array<any>;
  loading: boolean;
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const initialData: initialData = {
  LikesPhoto: [],
  loading: false,
  error: "",
};

const SET_LIKES_PHOTOS = "SET_LIKES_PHOTOS";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case SET_LIKES_PHOTOS:
      return { ...state, LikesPhoto: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const SetLikes = (likes: Array<any>) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_LIKES_PHOTOS,
    payload: likes,
  });
};
