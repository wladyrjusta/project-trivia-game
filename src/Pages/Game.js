import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionsEndpoint } from '../services/Api';

class Game extends React.Component {
  state = {
    indexQuestions: 0,
  };

  componentDidMount() {
    const recoveredQuestion = localStorage.getItem('token');
    const { dispatch, allQuestions } = this.props;
    dispatch(questionsEndpoint([recoveredQuestion]));
    const invalidToken = 3;
    if (allQuestions.response_code === invalidToken) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { allQuestions } = this.props;
    const { indexQuestions } = this.state;
    return (
      <div>
        {allQuestions.length > 0 && (
          <>
            <p data-testid="question-category">
              {allQuestions[indexQuestions].category}
            </p>
            <p data-testid="question-text">
              {allQuestions[indexQuestions].question}
            </p>

            <div data-testid="answer-options">
              <button
                // onClick={}
                id="correct-answer"
                type="button"
                // className={}
                // disabled={}
                data-testid="correct-answer"
              >
                {allQuestions[indexQuestions].correct_answer }

              </button>

              {allQuestions[indexQuestions].incorrect_answers
                .map((incorrect, index) => (
                  <button
                    type="button"
                    // onClick={}
                    id={ `wrong-answer-${index}` }
                    data-testid={ `wrong-answer-${index}` }
                    key={ index }
                    // disabled={}
                    // className={}
                  >
                    {incorrect}
                  </button>
                ))}
            </div>
          </>)}
      </div>
    );
  }
}

Game.propTypes = {
  fetchingQuestions: PropTypes.func,
}.isRequired;

// const mapDispatchToProps = {
//   fetchingQuestions: questionsEndpoint,
// };

const mapStateToProps = (state) => ({
  ...state.player,
  ...state.game,
});

export default connect(mapStateToProps)(Game);
// so criei aqui pra ser renderizado no login
