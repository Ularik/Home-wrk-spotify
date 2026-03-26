import { Routes, Route } from "react-router";
import Home from "./containers/Home";
import Header from "./components/Header/Header";
import { Container } from "@mui/material";


const App = () => {

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
