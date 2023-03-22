import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    url: '',
  };

  componentDidMount() {
    const { email } = this.props;
    if (email) {
      const mdiHash = md5(email).toString();
      const gravatar = `https://www.gravatar.com/avatar/${mdiHash}`;
      this.setState({
        url: gravatar,
      });
    }
  }

  render() {
    const { name, score } = this.props;
    const { url } = this.state;
    return (
      <div>

        <img
          data-testid="header-profile-picture"
          alt="Avatar do jogador"
          src={ url }
        />

        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
