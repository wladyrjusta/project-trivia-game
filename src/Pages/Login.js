import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import BtnSettings from '../components/BtnSettings';
import { actionLoginSuccess } from '../redux/actions';
import { tokenEndpoint } from '../services/Api';

class Login extends Component {
  state = {

    name: '',
    gravatarEmail: '',
  };

  //   componentDidMount() {
  //     const { fetchingToken } = this.props;
  //     fetchingToken();
  //   }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { history, infoLogin } = this.props;
    const { gravatarEmail, name } = this.state;
    const mdiHash = md5(gravatarEmail).toString();
    const imgGravatar = `https://www.gravatar.com/avatar/${mdiHash}`;
    infoLogin({ name, gravatarEmail, imgGravatar });

    history.push('/game');
  };

  render() {
    const { gravatarEmail, name } = this.state;
    const { history } = this.props;

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
            name="gravatarEmail"
            value={ gravatarEmail }
            onChange={ this.handleChange }
          />
        </label>

        <div>
          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClick }
            disabled={ gravatarEmail.length === 0 || name.length === 0 }
          >
            Play
          </button>
          {/* Apenas adicionei o botao */}
          <BtnSettings history={ history } />

        </div>

      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.objectOf,
}.isRequired;

const mapDispatchToProps = {
  fetchingToken: tokenEndpoint,
  infoLogin: actionLoginSuccess,
};

export default connect(null, mapDispatchToProps)(Login);
