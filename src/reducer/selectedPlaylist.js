/* eslint-disable import/no-anonymous-default-export */
export default function (state = {}, action) {
  switch (action.type) {
    case "SET_PLAYLIST":
      return { _id: action.payload };

    case "UNSET_PLAYLIST":
      return null;

    default:
      return state;
  }
}
