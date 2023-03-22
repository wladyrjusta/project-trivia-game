import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

// feedbackMessage = () => {
// pegar o valor de assertions como prop
// const magicNumber = 3;
// if (assertions < magicNumber) {
//   return 'Could be better...';
// }
// if (assertions >= magicNumber) {
//   return 'Well Done!';
// }
// };

class Feedback extends React.Component {
  render() {
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
        {/* <h2>{ this.feedbackMessage() }</h2> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {

};

export default connect(mapStateToProps)(Feedback);
