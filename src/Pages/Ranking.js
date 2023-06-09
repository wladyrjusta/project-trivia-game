// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

export default class Ranking extends Component {
  getImg(email) {
    const mdiHash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${mdiHash}`;
    return gravatar;
  }

  render() {
    const getUsersRanking = JSON.parse(localStorage.getItem('users'));
    console.log('getRanking', getUsersRanking);

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

        {getUsersRanking.map((info, index) => (
          <div
            key={ index }
          >
            <img
              src={ this.getImg(info.gravatarEmail) }
              alt={ info.name }
            />
            <h3
              data-testid={ `player-name-${index}` }
            >
              {info.name}
            </h3>

            <h3
              data-testid={ `player-score-${index}` }
            >
              {info.score}
            </h3>
          </div>
        ))}
      </div>
    );
  }
}
