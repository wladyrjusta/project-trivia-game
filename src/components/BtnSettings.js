import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BtnSettings extends Component {
  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ () => history.push('/settings') }
      >
        Configurações

      </button>
    );
  }
}

BtnSettings.propTypes = {
  history: PropTypes.objectOf,
}.isRequired;

export default BtnSettings;

// criei a prop pro history e a partir do momento que o botao fosse clicado, iria para /settings
