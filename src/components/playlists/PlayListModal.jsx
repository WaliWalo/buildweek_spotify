import React, { Component } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { BsClock, BsFillPlayFill } from "react-icons/bs";
import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { deleteSongFromPlaylist, getTrack } from "../../apis/playlist";
const mapStateToProps = (state) => {
  return { ...state, canUndo: state.playlists.past.length > 0 };
};

const mapDispatchToProps = (dispatch) => ({
  removeFromPlaylist: (payload) =>
    dispatch({ type: "REMOVE_SONG_FROM_PLAYLIST", payload }),
  onUndo: () => dispatch(UndoActionCreators.undo()),
});

class PlayListModal extends Component {
  state = { songs: [], loading: true };

  componentDidMount() {
    this.fetchSongs();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedPlaylist !== prevProps.selectedPlaylist) {
      if (this.props.selectedPlaylist) {
        this.fetchSongs();
      }
    }
    if (this.props.playlists.present !== prevProps.playlists.present) {
      if (this.props.selectedPlaylist) {
        this.fetchSongs();
      }
    }
  }

  fetchSongs = () => {
    this.setState({ songs: [] });
    if (this.props.selectedPlaylist) {
      let playlist = this.props.playlists.present.find((playlist) => {
        console.log(playlist.playlist._id);
        return playlist.playlist._id === this.props.selectedPlaylist._id;
      });
      console.log(playlist);
      if (playlist !== undefined) {
        playlist.playlist.songs.forEach(async (song) => {
          try {
            const resp = await getTrack(song.songId);
            if (resp.ok) {
              let data = await resp.json();
              this.setState({ songs: [...this.state.songs.concat(data)] });
            } else {
              let error = resp;
              console.log(error);
            }
          } catch (error) {
            console.log(error);
          }
        });
        this.setState({ loading: false });
      }
    }
  };

  toMinutes = (d) => {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    let hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return " " + hDisplay + mDisplay + sDisplay;
  };

  handleRemove = async (id) => {
    console.log(id);
    try {
      const res = await deleteSongFromPlaylist(
        this.props.selectedPlaylist._id,
        id
      );
      console.log(res);
      if (res.ok) {
        let data = await res.json();
        const payload = {
          _id: this.props.selectedPlaylist._id,
          songId: { _id: id },
          userId: data.userId,
          name: this.props.selectedPlaylist.name,
        };
        this.props.removeFromPlaylist(payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        {/* SHOW PLAYLIST MODAL */}
        {this.props.selectedPlaylist && (
          <Modal centered show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.props.selectedPlaylist.name} Playlist
                <Button
                  onClick={() => this.props.onUndo()}
                  disabled={!this.props.canUndo}
                >
                  Undo
                </Button>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col th-sm">
                      <span># </span>
                    </th>
                    <th scope="col th-lg" style={{ paddingLeft: "50px" }}>
                      Track Title
                    </th>
                    <th scope="col th-sm">Rank</th>
                    <th scope="col th-sm">
                      <BsClock />
                    </th>
                    {/*<div
                 // style={{ borderBottom: "1px solid #b3b3b3", width: "90%" }}
                ></div>*/}
                  </tr>
                </thead>

                <tbody>
                  {this.state.loading ? (
                    <Spinner
                      animation="grow"
                      variant="light"
                      className="mt-3 albums-spinner"
                    />
                  ) : (
                      this.state.songs.map((track, key) => (
                        <tr onclick="printInnerText(this)">
                          <th
                            scope="row"
                            style={{
                              verticalAlign: "middle",
                              minWidth: "30px",
                              maxWidth: "30px",
                            }}
                          >
                            <span
                              className="track-num"
                              style={{ width: "30px !important" }}
                            >
                              {key + 1}{" "}
                            </span>
                            <BsFillPlayFill
                              onclick="printInnerText()"
                              className="track-play play-track-btn"
                            />
                          </th>
                          <td>
                            <ul>
                              <li className="song">{track.title}</li>
                              <li
                                className="group"
                                style={{ verticalAlign: "middle" }}
                              >
                                {track.artist.name}
                              </li>
                            </ul>
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <p className="group">{track.rank}</p>
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <img
                              src="https://img.icons8.com/ios/15/b3b3b3/like.png"
                              className="track-heart"
                              alt="Album images"
                            />
                            <p className="group">
                              {this.toMinutes(track.duration)}
                            </p>
                            <img
                              src="https://img.icons8.com/material/15/b3b3b3/more--v1.png"
                              className="track-dots"
                              alt="Album images"
                            />
                          </td>
                          <td>
                            <Button onClick={() => this.handleRemove(track.id)}>
                              Remove
                          </Button>
                          </td>
                        </tr>
                      ))
                    )}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.onHide}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayListModal);
