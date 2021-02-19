/* eslint-disable import/no-anonymous-default-export */
export default function (state = [], action) {
  switch (action.type) {
    case "ADD_PLAYLIST":
      return [...state, action.payload];

    case "REMOVE_PLAYLIST":
      return [
        ...state.filter((playlist) => {
          return playlist.playlist._id !== action.payload;
        }),
      ];

    case "CLEAR_PLAYLIST":
      return [];

    case "ADD_SONG_TO_PLAYLIST":
      return [
        ...state.filter(
          (playlist) => playlist.playlist._id !== action.payload._id
        ),
        {
          playlist: {
            name: action.payload.name,
            _id: action.payload._id,
            userId: action.payload.userId,
            songs: [
              ...state
                .find((playlist) => {
                  return playlist.playlist._id === action.payload._id;
                })
                .playlist.songs.concat(action.payload.songId),
            ],
          },
        },
      ];

    case "REMOVE_SONG_FROM_PLAYLIST":
      console.log(action.payload);
      return [
        {
          playlist: {
            name: action.payload.name,
            _id: action.payload._id,
            userId: action.payload.userId,
            songs: [
              ...state
                .find((state) => state.playlist._id === action.payload._id)
                .playlist.songs.filter(
                  (song) => song !== action.payload.songId
                ),
            ],
          },
        },
        ...state.filter((state) => {
          console.log(state.playlist._id, action.payload._id);
          return state.playlist._id !== action.payload._id;
        }),
      ];

    default:
      return state;
  }
}
