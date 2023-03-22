import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  const {
    finalScore,
    correctAnswers,
  } = this.props;
  render() {
    console.log(this.props.st);
    return (
      <div>
        <Header />
        <div>
          <h1>Placar</h1>
          <span data-testid="feedback-total-score">{ finalScore }</span>
          <h2>Acertos :</h2>
          <span data-testid="feedback-total-question">{correctAnswers }</span>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  finalScore: state.score,
  correctAnswers: state.count,
});

Feedback.propTypes = {
  
};

export default connect(mapStateToProps)(Feedback);
