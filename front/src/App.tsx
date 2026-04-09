import { Routes, Route } from "react-router";
import Home from "./containers/Home";
import Albums from "./containers/Albums";
import Trecks from "./containers/Trecks";
import Header from "./components/Header/Header";
import { Container } from "@mui/material";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import TreckHistory from "./containers/TreckHistory";
import ArtistForm from "./components/artists/ArtistForm";
import AlbumsForm from "./components/albums/AlbumsForm";
import TrecksForm from "./components/trecks/TrecksForm";


const App = () => {

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/trecks" element={<Trecks />} />
          <Route path="/history" element={<TreckHistory />} />
          <Route path="/add-artist" element={<ArtistForm />} />
          <Route path="/add-album" element={<AlbumsForm />} />
          <Route path="/add-treck" element={<TrecksForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
