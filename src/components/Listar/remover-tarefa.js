import { useState } from "react";
import React from "react";
import propTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function RemoverTarefa(props) {
  const [exibirModal, setExibirModal] = useState(false);

  function handleAbrirModal(event) {
    event.preventDefault();
    setExibirModal(true);
  }

  function handleFecharModal() {
    setExibirModal(false);
  }

  function handleRemoverTarefa(event) {
    event.preventDefault();
    const tarefasDb = localStorage["tarefas"];
    let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
    tarefas = tarefas.filter((tarefa) => tarefa.id !== props.tarefa.id);
    localStorage["tarefas"] = JSON.stringify(tarefas);
    setExibirModal(false);
    props.recarregarTarefas(true);
  }

  return (
    <span>
      <Button variant="danger" className="btn-sm" onClick={handleAbrirModal}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      <Modal show={exibirModal} onHide={handleFecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remover tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente remover a seguinte tarefa?
          <br />
          <strong>{props.tarefa.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRemoverTarefa}>
            Sim
          </Button>
          <Button variant="light" onClick={handleFecharModal}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}

RemoverTarefa.propTypes = {
  tarefa: propTypes.object.isRequired,
  recarregarTarefa: propTypes.func.isRequired,
  className: propTypes.string.isRequired,
};

export default RemoverTarefa;
