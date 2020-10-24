import React from 'react';
import quiz from '../apis/quiz';
import { Link } from 'react-router-dom';
import './PostFriendGuesses.css';


class PostFriendGuesses extends React.Component {

    state = {
        friendName: "", friendId: "", user: {}, questions: [], disableButton: false,
        color: "", food: "", sports: "", country: "", animal: "", displayNoUserExists: false
    }

    componentDidMount() {
        this.checkIfUserExists();
    }

    onInputChange = (event) => {
        this.setState({ friendName: event.target.value });
    }

    checkIfUserExists = async () => {
        const users = await quiz.get('/users');
        console.log(users);
        console.log(this.props.match.params); //access to url params
        const userName = this.props.match.params.username;
        const userId = this.props.match.params.userid;

        const user = users.data.filter((user) => {
            return user.name === userName && Number(user.id) === Number(userId)
        })

        if (user.length === 0) {
            this.setState({ displayNoUserExists: true });
        }
        else {
            this.setState({ user: user[0] });
            console.log(this.state.user);
            this.getQuestions();
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.friendName === "" || this.state.color === "" || this.state.food === "" || this.state.sports === "" || this.state.country === "" ||
            this.state.animal === "") {
            return console.log("you need to fill all questions and have a valid name");
        }
        const friendInfo = {
            name: this.state.friendName,
            location: "location",
            answers: [this.state.color, this.state.food, this.state.sports, this.state.country, this.state.animal]
        }
        this.setState({ disableButton: true });
        this.postFriendGuesses(friendInfo);


    }

    postFriendGuesses = async (friendGuesses) => {
        const response = await quiz.post(`/${this.state.user.name}/${this.state.user.id}/answerquiz`, friendGuesses);
        console.log(response);
    }

    getQuestions = async () => {
        console.log("in questions");
        const response = await quiz.get('/questions');
        const data = response.data;
        // console.log(data);
        this.setState({ questions: [...data] });

    }

    renderQuestions = () => {
        const questions = this.state.questions;
        return questions.map(question => {
            return (
                <div className="question-main-container" key={question.q}>
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

    render() {
        if (this.state.questions.length !== 0) {
            return (
                <div>
                    <h1>Guess {this.state.user.name}'s answers</h1>
                    <form>
                        <div>
                            <label>Enter Your Name</label>
                            <input className="input-field" type="text" value={this.state.friendName} onChange={this.onInputChange} />
                            {this.renderQuestions()}
                        </div>
                        <button className="submit-btn" disabled={this.state.disableButton} onClick={this.onFormSubmit} type="submit">
                        <a className="white-text" href={`/${this.state.user.name}/${this.state.user.id}/friendsrank`}>submit</a></button>
                    </form>
                        <Link to={`/${this.state.user.name}/${this.state.user.id}/friendsrank`}>Go to user's friends rank</Link>
                </div>
            );
        }
        else if (this.state.displayNoUserExists) {
            return (
                <div>User not found</div>
            )
        }
        else {
            return (
                <div>loading</div>
            )
        }

    }
}

export default PostFriendGuesses;