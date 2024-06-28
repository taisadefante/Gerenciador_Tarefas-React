import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import propTypes from "prop-types";

function Ordenacao(props) {
  function handleAscDesc() {
    return props.ordenarAsc || props.ordenarDesc ? "hidden" : "";
  }

  function handleAsc() {
    return props.ordenarAsc ? "" : "hidden";
  }

  function handleDesc() {
    return props.ordenarDesc ? "" : "hidden";
  }

  return (
    <span>
      <FontAwesomeIcon icon={faSort} className={handleAscDesc()} />
      <FontAwesomeIcon icon={faSortUp} className={handleAsc()} />
      <FontAwesomeIcon icon={faSortDown} className={handleDesc()} />
    </span>
  );
}

Ordenacao.propTypes = {
  ordenarAsc: propTypes.bool.isRequired,
  ordenarDesc: propTypes.bool.isRequired,
};

export default Ordenacao;
