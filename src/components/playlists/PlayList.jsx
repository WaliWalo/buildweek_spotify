import { Button, Card, Modal, Form } from "react-bootstrap";
import React, { Component } from "react";
import AsideMenu from "../AsideMenu";
import Player from "../Player";
import { connect } from "react-redux";
import PlayListModal from "./PlayListModal";
import backgroundImg from "../../assets/rock-concert.jpg";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylist,
} from "../../apis/playlist";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addPlaylist: (name) => dispatch({ type: "ADD_PLAYLIST", payload: name }),
  removePlaylist: (name) =>
    dispatch({ type: "REMOVE_PLAYLIST", payload: name }),
  setPlayList: (name) => dispatch({ type: "SET_PLAYLIST", payload: name }),
  unsetPlaylist: () => dispatch({ type: "UNSET_PLAYLIST" }),
  clearPlaylist: () => dispatch({ type: "CLEAR_PLAYLIST" }),
});

class PlayList extends Component {
  state = {
    show: false,
    name: "",
    playListModal: false,
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handlePlayListClose = () => {
    this.props.unsetPlaylist();
    this.setState({ playListModal: false });
  };
  handlePlayListShow = (e) => {
    this.props.setPlayList(e.currentTarget.id);
    this.setState({
      playListModal: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.makePlaylist(this.state.name);
  };

  makePlaylist = async (playlist) => {
    const res = await createPlaylist(playlist);
    const data = await res.json();
    this.props.addPlaylist(data);

    console.log(data);
  };

  getPlaylists = async () => {
    let res = await getPlaylist();
    if (res.ok) {
      this.props.clearPlaylist();
      let playlists = await res.json();
      if (playlists.length > 0) {
        playlists.forEach((playlist) => {
          this.props.addPlaylist({ playlist });
        });
      }
    } else {
      console.log(res);
    }
  };

  componentDidMount = () => {
    this.getPlaylists();
  };

  // componentDidUpdate = (prevProps) => {
  //   if (
  //     this.props.playlists.present.length !== prevProps.playlists.present.length
  //   ) {
  //     // this.getPlaylists();
  //   }
  // };

  handleOnchange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleRemove = async (e) => {
    this.props.removePlaylist(e.currentTarget.id);
    await deletePlaylist(e.currentTarget.id);
  };

  render() {
    return (
      <div>
        <AsideMenu />
        <section className="mainframe">
          <div
            className="main-content"
            style={{ overflowY: "hidden !important" }}
          >
            <h1>Playlists</h1>
            <div style={{ display: "flex", flexDirections: "row" }}>
              {this.props.playlists.present.length > 0 &&
                this.props.playlists.present.map((playlist) => (
                  <Card
                    style={{
                      width: "10rem",
                      backgroundColor: "#1b1b1b",
                      color: "#eee",
                    }}
                  >
                    <Card.Img
                      id={playlist.playlist._id}
                      variant="top"
                      src={backgroundImg}
                      onClick={(e) => this.handlePlayListShow(e)}
                    />
                    <Card.Body>
                      <Card.Title>{playlist.playlist.name}</Card.Title>
                    </Card.Body>
                    <Button
                      variant="danger"
                      id={playlist.playlist._id}
                      onClick={(e) => this.handleRemove(e)}
                    >
                      Delete
                    </Button>
                  </Card>
                ))}
            </div>
            <Button onClick={() => this.handleShow()}>Create Playlist</Button>
            {/* ADD PLAYLIST MODAL */}
            <Modal
              centered
              show={this.state.show}
              onHide={() => this.handleClose()}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Playlist</Modal.Title>
              </Modal.Header>
              <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Modal.Body>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Playlist Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      onChange={(e) => this.handleOnchange(e)}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => this.handleClose()}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => this.handleClose()}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>

            <PlayListModal
              show={this.state.playListModal}
              onHide={() => this.handlePlayListClose()}
              selectedPlayList={this.state.selectedPlaylist}
            />
          </div>
        </section>
        <Player />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
