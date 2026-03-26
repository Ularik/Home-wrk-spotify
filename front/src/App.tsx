import { Routes, Route } from "react-router";
import Home from "./containers/Home";
import Albums from "./containers/Albums";
import Trecks from "./containers/Trecks";
import Header from "./components/Header/Header";
import { Container } from "@mui/material";


const App = () => {

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/trecks" element={<Trecks />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
