import React from 'react';
import quiz from './apis/quiz';
import AddNewUser from './components/AddNewUser';

class QuizManager extends React.Component {

  state = {questions: []}

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    console.log("in questions");
    const response = await quiz.get('/questions');
    const data = response.data;
    console.log(data);
    this.setState({questions:[...data]});

  }

  renderQuestions = () => {
    const questions = this.state.questions;
    return questions.map(question=> {
      return (
        <div>{question.q}</div>
      )
    })
  }

  // newUser = async (userInfo)=> {
  //   const response = await quiz.post('/user/create', userInfo);
  //   // const data = response.data;
  //   console.log(response);
  // }

  render() {
    if(this.state.questions.length !==0) {
      return (
        <div className="App">
          {/* <AddNewUser newUser = {this.newUser}/> */}
          {this.renderQuestions()}
        </div>
      );

    }
    else {
      return (
        <div>loading</div>
      )
    }

  }
}

export default QuizManager;
