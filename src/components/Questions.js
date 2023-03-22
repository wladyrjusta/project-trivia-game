import React from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
// import { connect } from 'react-redux';
// import { questionsEndpoint } from '../services/Api';

class Questions extends React.Component {
  state = {
    indexQuestions: 0,
    arrayQuestion: [],
    answered: false,
    randomAnswer: [],
    timer: 30,
  };

  async componentDidMount() {
    const timer = 1000;
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
    this.questionRender(resultsQuestions);
    setInterval(() => this.setTimer(), timer);
  }

  questionRender = (arrayQuestion) => {
    const { indexQuestions } = this.state;
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
      // return misturaAnswer;
    }
  };

  setTimer = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.setState({
        answered: true,
      });
    }
  };

  btnChangeColor = () => {
    this.setState({
      answered: true,
    });
  };

  render() {
    const { arrayQuestion, indexQuestions, answered, randomAnswer, timer } = this.state;
    return (
    //   <div>
    //     {arrayQuestion.length > 0 && (
    //       <>
    //         <p data-testid="question-category">
    //           {arrayQuestion[indexQuestions].category}
    //         </p>
    //         <p data-testid="question-text">
    //           {arrayQuestion[indexQuestions].question}
    //         </p>
    //       </>
    //     )}
    //         <div data-testid="answer-options">
    //           {
    //           arrayQuestion.length > 0 && (
    //               <button
    //                 key={ a.question }
    //                 className={ a.question }
    //                 data-testid={ a.dataTestid }
    //                 value={ a.correct }
    //               >
    //                 {a.question}
    //               </button>;
    //             ))
    // )
    //             }

    //   </div>

      <div>

        {arrayQuestion.length > 0 && (
          <>
            <p data-testid="question-category">
              {arrayQuestion[indexQuestions].category}
            </p>
            <p data-testid="question-text">
              {arrayQuestion[indexQuestions].question}
            </p>
          </>

        ) }

        <div data-testid="answer-options">

          {arrayQuestion.length > 0 && (
            randomAnswer.map((a) => (
              <button
                key={ a.questionsOk }
                className={ answered ? a.color : '' }
                data-testid={ a.dataTestid }
                value={ a.correct }
                onClick={ () => this.btnChangeColor() }
                disabled={ answered }
              >
                {a.questionsOk}
              </button>
            ))

          )}
        </div>

        <div>
          {timer}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  fetchingQuestions: PropTypes.func,
}.isRequired;

// const mapDispatchToProps = {
//   fetchingQuestions: questionsEndpoint,
// };

// const mapStateToProps = (state) => ({
//   ...state.player,
//   ...state.game,
// });

export default Questions;
// so criei aqui pra ser renderizado no login
