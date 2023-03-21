import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { questionsEndpoint } from '../services/Api';

class Questions extends React.Component {
  state = {
    indexQuestions: 0,
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
      // this.setState({
      //   randomAnswer: misturaAnswer,
      // });
      return misturaAnswer;
    }
  };

  render() {
    const { arrayQuestion, indexQuestions } = this.state;
    const catchAll = this.questionRender();
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
    //             catchAll.map((a) => {
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
            catchAll.map((a) => (
              <button
                key={ a.questionsOk }
                className={ a.questionsOk }
                data-testid={ a.dataTestid }
                value={ a.correct }
              >
                {a.questionsOk}
              </button>
            ))

          )}
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
