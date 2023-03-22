import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { RESET_GAME, actionHandled } from '../redux/actions';

class Feedback extends React.Component {
  componentDidMount() {
    this.addUserToLocalStorage();
  }

  feedbackMessage = () => {
    const { assertions } = this.props;
    const magicNumber = 3;
    if (assertions < magicNumber) {
      return (<h2>Could be better...</h2>);
    }
    if (assertions >= magicNumber) {
      return (<h2>Well Done!</h2>);
    }
  };

  addUserToLocalStorage = () => {
    const {
      name,
      gravatarEmail,
      assertions,
      score,
    } = this.props;

    const user = {
      name,
      gravatarEmail,
      assertions,
      score,
    };
    const getUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log('GetUSER', getUsers);
    const users = [...getUsers, user];
    const userSortDescending = users.sort((a, b) => b.score - a.score);
    localStorage.setItem('users', JSON.stringify(userSortDescending));
  };

  handleClickPlayAgain = () => {
    const { dispatch, history } = this.props;
    dispatch(actionHandled(RESET_GAME));
    history.push('/');
  };

  handleClickRanking = () => {
    const { dispatch, history } = this.props;
    dispatch(actionHandled(RESET_GAME));
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <div>
          <h1>Placar</h1>
          <span data-testid="feedback-total-score"><h2>{ score }</h2></span>
          <h2>Acertos :</h2>
          <span data-testid="feedback-total-question"><h2>{assertions}</h2></span>
          <span data-testid="feedback-text">{ this.feedbackMessage() }</span>
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ () => this.handleClickPlayAgain() }
        >
          Play Again
        </button>

        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => this.handleClickRanking() }
          >
            VER RANKING
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

Feedback.defaultProps = {
  score: 0,
  assertions: 0,
};

export default connect(mapStateToProps)(Feedback);
