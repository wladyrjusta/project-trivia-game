import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { questionsEndpoint } from '../services/Api';

class Game extends React.Component {
  state = {
    indexQuestions: 0,
    randomAnswer: [],
    arrayQuestion: [],
  };

  async componentDidMount() {
    const recoveredQuestion = localStorage.getItem('token');
    // const { dispatch, allQuestions } = this.props;
    const url = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${recoveredQuestion}`)).json();
    const resultsQuestions = url.results;
    this.setState({
      arrayQuestion: resultsQuestions,
    });
    // dispatch(questionsEndpoint([recoveredQuestion]));
    const invalidToken = 3;
    if (url.response_code === invalidToken) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  questionRender = () => {
    const { indexQuestions, arrayQuestion } = this.state;
    if (arrayQuestion.length > 0) {
      const correctRender = {
        dataTestid: 'correct-answer',
        correctRender: true,
        questionsOk: arrayQuestion[indexQuestions].correct_answer,
        color: 'green',
      };
      const incorrectRender = arrayQuestion[indexQuestions].incorrect_answers
        .map((answer, index) => ({
          dataTestid: `wrong-answer-${index}`,
          correctRender: false,
          questionsOk: answer,
          color: 'red',
        }));
      const questionsAll = [
        ...incorrectRender,
        correctRender,
      ];
      const magicNumber = 0.5;
      const misturaAnswer = questionsAll.sort(() => magicNumber - Math.random());
      this.setState({
        randomAnswer: misturaAnswer,
      });
    }
  };

  render() {
    const { arrayQuestion } = this.props;
    const { indexQuestions, arrayQuestion } = this.state;
    return (
      <div>

        {arrayQuestion.length > 0 && (
          <>
            <p data-testid="question-category">
              {arrayQuestion[indexQuestions].category}
            </p>
            <p data-testid="question-text">
              {arrayQuestion[indexQuestions].question}
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
                {arrayQuestion[indexQuestions].correct_answer }

              </button>

              {arrayQuestion[indexQuestions].incorrect_answers
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
