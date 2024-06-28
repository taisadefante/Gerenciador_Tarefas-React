import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ItensListaTarefas from "./itens-lista-tarefas";
import Paginacao from "./paginacao";
import Ordenacao from "./ordenacao";
import Footer from "../footer/footer";
import Img from "../../img/tarefas.png";

function Listar() {
  const ITENS_POR_PAG = 9;

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItens, setTotalItens] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOdenarAsc] = useState(false);
  const [ordenasDesc, setOrdenarDesc] = useState(false);
  const [filtroTarefa, setFiltroTarefa] = useState("");

  useEffect(() => {
    function obterTarefas() {
      const tarefasDb = localStorage["tarefas"];
      let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

      //filtrar
      listaTarefas = listaTarefas.filter(
        (t) => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) >= 0
      );

      //ordenar
      if (ordenarAsc) {
        listaTarefas.sort((t1, t2) =>
          t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1
        );
      } else if (ordenasDesc) {
        listaTarefas.sort((t1, t2) =>
          t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1
        );
      }

      //paginar
      setTotalItens(listaTarefas.length);

      setTarefas(
        listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG)
      );
    }
    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas, paginaAtual, ordenarAsc, ordenasDesc]);

  function handleMudarPagina(pagina) {
    setPaginaAtual(pagina);
    setCarregarTarefas(true);
  }

  function handleOrdenar(event) {
    event.preventDefault();
    if (!ordenarAsc && !ordenasDesc) {
      setOdenarAsc(true);
      setOrdenarDesc(false);
    } else if (ordenarAsc) {
      setOdenarAsc(false);
      setOrdenarDesc(true);
    } else {
      setOdenarAsc(false);
      setOrdenarDesc(false);
    }
    setCarregarTarefas(true);
  }

  function handleFiltrar(event) {
    setFiltroTarefa(event.target.value);
    setCarregarTarefas(true);
  }

  return (
    <div className="text-center">
      <div className="titulo">
        <img src={Img} />

        <h1> Gerenciador de Tarefas</h1>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrdenar}>
                Tarefa &nbsp;
                <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenasDesc} />
              </a>
            </th>
            <th>
              <Link to="/cadastrar">
                <Button className="btn btn-success btn-sm" type="submit">
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp; Nova Tarefa
                </Button>
              </Link>
            </th>
          </tr>
          <tr>
            <th>
              <Form.Control
                type="text"
                value={filtroTarefa}
                onChange={handleFiltrar}
                placeholder="🔎"
                className="filtro-tarefa"
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ItensListaTarefas
            tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas}
          />
        </tbody>
      </Table>
      <Paginacao
        totalItens={totalItens}
        itensPorPagina={ITENS_POR_PAG} // Certifique-se de que está correto
        paginaAtual={paginaAtual}
        mudarPagina={handleMudarPagina}
      />

      <Footer />
    </div>
  );
}

export default Listar;
