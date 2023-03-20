import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, imgGravatar } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="Avatar do jogador"
          src={ imgGravatar }
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  imgGravatar: state.player.imgGravatar,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  imgGravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
