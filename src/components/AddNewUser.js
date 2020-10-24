import React from 'react';
import quiz from '../apis/quiz';
import './AddNewUser.css';

class AddNewUser extends React.Component {

    state = {
        userName: "", userId: "", questions: [], disableButton: false,
        color: "", food: "", sports: "", country: "", animal: "", yourLink: ""
    }

    componentDidMount() {
        this.getQuestions();
    }

    onInputChange = (event) => {
        this.setState({ userName: event.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        if (this.state.userName === "" || this.state.color === "" || this.state.food === "" || this.state.sports === "" || this.state.country === "" ||
            this.state.animal === "") {
            return console.log("you need to fill all questions and have a valid user name");
        }
        const userInfo = {
            name: this.state.userName,
            location: "location",
            answers: [this.state.color, this.state.food, this.state.sports, this.state.country, this.state.animal]
        }
        this.setState({ disableButton: true });
        this.newUser(userInfo);
    }

    newUser = async (userInfo) => {
        const response = await quiz.post('/user/create', userInfo);
        console.log(response);
        // console.log(response.data.id);
        this.setState({ userId: response.data.id });

        this.generateUserLink();
    }


    getQuestions = async () => {
        console.log("in questions");
        const response = await quiz.get('/questions');
        const data = response.data;
        console.log(data);
        this.setState({ questions: [...data] });

    }

    onRadioCheck = (question, event) => {
        console.log(event.target.value);
        question = question.split(" ");
        question = question[question.length - 1];
        question = question.slice(0, -1);
        if (question === "color") {
            this.setState({ color: event.target.value });
        }
        else if (question === "food") {
            this.setState({ food: event.target.value });
        }
        else if (question === "sports") {
            this.setState({ sports: event.target.value });
        }
        else if (question === "country") {
            this.setState({ country: event.target.value });
        }
        else {
            this.setState({ animal: event.target.value });
        }
    }

    renderQuestions = () => {
        const questions = this.state.questions;
        return questions.map(question => {
            return (
                <div className="question-main-container"  key={question.q}>
                    <div className="question-sub-container">
                        <div className="question">{question.q}</div>
                        <input className="radio-input" type="radio" name={question.q} value="1" onChange={(event) => this.onRadioCheck(question.q, event)} />
                        <label>{question.a[0]}</label>
                        <input className="radio-input" type="radio" name={question.q} value="2" onChange={(event) => this.onRadioCheck(question.q, event)} />
                        <label>{question.a[1]}</label>
                        <input className="radio-input" type="radio" name={question.q} value="3" onChange={(event) => this.onRadioCheck(question.q, event)} />
                        <label>{question.a[2]}</label>
                        <input className="radio-input" type="radio" name={question.q} value="4" onChange={(event) => this.onRadioCheck(question.q, event)} />
                        <label>{question.a[3]}</label>
                    </div>
                </div>

            )
        })
    }

    generateUserLink = () => {
        const link = `http://localhost:3000/${this.state.userName}/${this.state.userId}/answerquiz`
        this.setState({ yourLink: link });
    }

    render() {
        if (this.state.questions.length !== 0) {
            return (
                <div>
                    <form >
                        <div>
                        <h1>Create your quiz</h1>
                            <label>Enter Your Name</label>
                            <input className="input-field" type="text" value={this.state.userName} onChange={this.onInputChange} />
                            {this.renderQuestions()}
                        </div>
                        <button className="submit-btn" disabled={this.state.disableButton} onClick={this.onFormSubmit} type="submit">Submit</button>
                    </form>
                    <h4>-Submit Quiz to get your quiz link below-</h4>
                    <a className="user-link" href={this.state.yourLink}>{this.state.yourLink}</a>
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

export default AddNewUser;