import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    // const { history } = this.props;
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Feedback.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
};

export default Feedback;
