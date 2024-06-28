import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Img from "../../img/tarefas.png";
import Footer from "../footer/footer";

function Atualizar() {
  const { id } = useParams(); // <-- Extract the id from the route parameters
  const [exibirModal, setExibirModal] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [tarefa, setTarefa] = useState("");
  const [carregarTarefa, setCarregarTarefa] = useState(true);

  useEffect(() => {
    if (carregarTarefa) {
      const tarefasDb = localStorage["tarefas"];
      const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
      const tarefa = tarefas.filter((t) => t.id === parseInt(id))[0]; // <-- Use id from useParams
      if (tarefa) {
        setTarefa(tarefa.nome);
      }
      setCarregarTarefa(false);
    }
  }, [carregarTarefa, id]); // <-- Use id from useParams

  const navigate = useNavigate();

  function handleFecharModal() {
    setExibirModal(false);
    navigate("/");
  }

  function atualizar(event) {
    event.preventDefault();
    setFormValidado(true);
    if (event.currentTarget.checkValidity() === true) {
      // obtém as tarefas
      const tarefasDb = localStorage["tarefas"];
      let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
      // persistir a tarefa atualizada
      tarefas = tarefas.map((tarefaObj) => {
        if (tarefaObj.id === parseInt(id)) {
          // <-- Use id from useParams
          tarefaObj.nome = tarefa;
        }
        return tarefaObj;
      });
      localStorage["tarefas"] = JSON.stringify(tarefas);

      setExibirModal(true);
    }
  }

  function handleTxtTarefa(event) {
    setTarefa(event.target.value);
  }

  return (
    <div className="text-center">
      <div className="titulo">
        <img src={Img} alt="Tarefas" />
        <h1> Atualizar</h1>
      </div>
      <div>
        <Form onSubmit={atualizar} noValidate validated={formValidado}>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              value={tarefa}
              onChange={handleTxtTarefa}
            />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center mt-4">
            <Button variant="success" type="submit">
              Atualizar
            </Button>
            &nbsp;
            <Link to="/" variant="light" className="btn btn-light ">
              Voltar
            </Link>
          </Form.Group>
        </Form>
        <Modal show={exibirModal} onHide={handleFecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tarefa atualizada com sucesso!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Atualizar;
