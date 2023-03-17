// import PropTypes from 'prop-types'
import React, { Component } from 'react';

export default class Login extends Component {
  state = {

    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    console.log('clicou');
  };

  render() {
    const { email, name } = this.state;

    return (
      <div>

        <label
          htmlFor="name"
        >
          NOME
          <input
            type="text"
            data-testid="input-player-name"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>

        <label
          htmlFor="email"
        >
          EMAIL
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <div>
          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClick }
            disabled={ email.length === 0 || name.length === 0 }
          >
            Play
          </button>

        </div>

      </div>
    );
  }
}
