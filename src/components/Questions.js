import React from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { connect } from 'react-redux';
import { UPDATE_SCORE, actionHandled, assertionsNumber } from '../redux/actions';

class Questions extends React.Component {
  state = {
    indexQuestions: 0,
    arrayQuestion: [],
    answered: false,
    mixedQuestions: [],
    timer: 30,
  };

  async componentDidMount() {
    const arrayQuestion = await this.questionsFetch();
    this.questionRender(arrayQuestion);
    const timerReload = 1000;
    setInterval(() => this.setTimer(), timerReload);
    console.log(arrayQuestion);
  }

  componentDidUpdate() {
    // Nao entendi 100% se o cypress quer que seja redirecionado logo apos repsonder a ultima pergunta ou apos clicar no Next depois disso
    // const { history } = this.props;
    // const {
    //   indexQuestions,
    //   answered,
    // } = this.state;
    // const indexLimit = 5;
    // if (answered && (indexQuestions === indexLimit)) {
    //   history.push('/feedback');
    // }
  }

  // Separei a Requisicao a API do ComponentDidMount
  questionsFetch = async () => {
    const recoveredQuestion = localStorage.getItem('token');
    const url = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${recoveredQuestion}`)).json();
    const invalidToken = 3;
    if (url.response_code === invalidToken) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      arrayQuestion: url.results,
    });
    return url.results;
  };

  questionRender = (arrayQuestion) => {
    const { indexQuestions } = this.state;
    console.log('indexQuestions', indexQuestions);
    // console.log(arrayQuestion);
    if (arrayQuestion.length > 0) {
      const correctRender = {
        dataTestid: 'correct-answer',
        correctRender: true,
        questionText: arrayQuestion[indexQuestions].correct_answer,
        color: 'green',
        difficulty: arrayQuestion[indexQuestions].difficulty,
      };

      const incorrectRender = arrayQuestion[indexQuestions].incorrect_answers
        .map((answer, index) => ({
          dataTestid: `wrong-answer-${index}`,
          correctRender: false,
          questionText: answer,
          color: 'red',
          difficulty: arrayQuestion[indexQuestions].difficulty,
        }));
      const questionsAll = [
        ...incorrectRender,
        correctRender,
      ];
      // console.log(questionsAll);
      this.mixQuestions(questionsAll);
    }
  };

  // Separei a logica que aleatoriza as questoes para ficar mais organizado
  mixQuestions = (questions) => {
    const magicNumber = 0.5;
    const mixedQuestions = questions.sort(() => magicNumber - Math.random());
    // console.log(mixedQuestions);
    this.setState({
      mixedQuestions,
    });
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

  handleClickAnswer = (id, difficulty) => {
    const { dispatch } = this.props;
    const { timer } = this.state;
    const scoresParameter = 10;
    const hardParameter = 3;
    const MediumParameter = 2;
    let multiplier = 1;

    this.setState({
      answered: true,
      timer: 0,
    });
    if (difficulty === 'hard') {
      multiplier = hardParameter;
    }
    if (difficulty === 'medium') {
      multiplier = MediumParameter;
    }

    if (id === 'correct-answer') {
      const scoresValue = scoresParameter + (timer * multiplier);
      dispatch(actionHandled(UPDATE_SCORE, scoresValue));
      dispatch(assertionsNumber(1));
    }
    // Nao altera nada quando a resposta e errada, pelo menos por enquanto
  };

  // Esta com delay, esta renderizando o novo texto da pergunta mas os botoes estao sendo rendererizados da pergunta anterior
  handleClickNext = () => {
    const { arrayQuestion, indexQuestions } = this.state;
    const { history } = this.props;
    const limitOfQuestions = 5;

    if (indexQuestions < limitOfQuestions - 1) {
      this.setState({
        answered: false,
        timer: 30,
        indexQuestions: indexQuestions + 1,
      });
      this.questionRender(arrayQuestion);
    }
    // } else if (indexQuestions >= limitOfQuestions - 1) {
    //   this.questionRender(arrayQuestion);
    // }

    const lengthIndexOfQuestions = 3;

    if (indexQuestions > lengthIndexOfQuestions) {
      history.push('/feedback');
    }
  };

  render() {
    const {
      arrayQuestion,
      indexQuestions,
      answered,
      mixedQuestions,
      timer,
    } = this.state;

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
          </>
        ) }

        <div data-testid="answer-options">
          {arrayQuestion.length > 0 && (
            mixedQuestions.map((a) => (
              <button
                key={ a.questionText }
                className={ answered ? a.color : '' }
                data-testid={ a.dataTestid }
                value={ a.correct }
                onClick={ () => { this.handleClickAnswer(a.dataTestid, a.difficulty); } }
                disabled={ answered }
              >
                {a.questionText}
              </button>
            ))
          )}
        </div>

        <div>
          {timer}
        </div>
        { answered && (
          <div>
            <button
              key="nextButton"
              data-testid="btn-next"
              onClick={ () => { this.handleClickNext(); } }
            >
              Next
            </button>
          </div>
        )}

      </div>
    );
  }
}

Questions.propTypes = {
  fetchingQuestions: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Questions);
// so criei aqui pra ser renderizado no login
