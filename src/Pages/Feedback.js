import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <div>
          <h1>Placar</h1>
          <span data-testid="feedback-total-score">[colocar o valor do score] </span>
          <h2>Acertos :</h2>
          <span data-testid="feedback-total-question">[colocar o valor assertions]</span>
          <span data-testid="feedback-text">[Colocar mensagem de feedBack]</span>
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
};

export default connect(mapStateToProps)(Feedback);
