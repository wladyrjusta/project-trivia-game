// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar à tela inicial
          </button>

        </Link>

      </div>
    );
  }
}
