export const createPlaylist = async (playlist) => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`http://localhost:4000/songs/playlist`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ name: playlist }),
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getPlaylist = async () => {
  try {
    const response = await fetch(`http://localhost:4000/songs/playlist`, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePlaylist = async (playlistId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/songs/playlist/${playlistId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addSongToPlaylist = async (playlistId, songId) => {
  try {
    console.log(songId);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(
      `http://localhost:4000/songs/playlist/${playlistId}`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ songId: songId }),
        credentials: "include",
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteSongFromPlaylist = async (playlistId, songId) => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(
      `http://localhost:4000/songs/playlist/${playlistId}/${songId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const getTrack = async (songId) => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(
      `http://localhost:4000/songs/track?track=${songId}`,
      {
        credentials: "include",
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};
