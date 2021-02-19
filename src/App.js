import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AsideMenu from "./components/AsideMenu";
import Player from "./components/Player";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomeContent from "./components/HomeContent";

import { BrowserRouter as Router, Route } from "react-router-dom";
import AlbumPage from "./components/album/AlbumPage";
import ArtistPage from "./components/artist/ArtistPage";
import SearchPage from "./components/search/SearchPage";
import PlayList from "./components/playlists/PlayList";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin(!isLogin);
  };
  useEffect(() => {
    if (Cookies.get("accessToken")) {
      setIsLogin(true);
    }
  }, [isLogin]);
  return (
    <Router>
      <Route
        path="/login"
        exact
        render={(props) => <Login handleLogin={handleLogin} />}
      />
      <Route path="/Signup" exact component={Signup} />
      <Route
        path="/"
        exact
        render={(props) => (
          <AsideMenu isLogin={isLogin} handleLogin={handleLogin} />
        )}
      />
      <Route path="/" exact component={Player} />
      <Route path="/" exact component={HomeContent} />
      <Route path="/albumPage/:album" exact component={AlbumPage} />
      <Route path="/artistPage/:artist" exact component={ArtistPage} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/playList" exact component={PlayList} />
    </Router>
  );
}

export default App;
