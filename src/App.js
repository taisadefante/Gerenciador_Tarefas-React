import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Cadastrar from "./components/Cadastrar/Cadastrar";
import Atualizar from "./components/Atualizar/Atualizar";
import Listar from "./components/Listar/Listar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listar />} />
        <Route path="cadastrar" element={<Cadastrar />} />
        <Route path="atualizar/:id" element={<Atualizar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
