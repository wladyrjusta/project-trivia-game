import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
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

  render() {
    const { history } = this.props;
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
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        {/* <h2>{ this.feedbackMessage() }</h2> */}
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
};

Feedback.defaultProps = {
  score: 0,
  assertions: 0,
};

export default connect(mapStateToProps)(Feedback);
