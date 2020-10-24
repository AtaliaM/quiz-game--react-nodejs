import React from 'react';
import quiz from '../apis/quiz';
import './DisplayFriendsRank.css';


class DisplayFriendsRank extends React.Component {

    state = {userName: "", userId: "", friendsRank: [], displayNoUserExists: false}

    componentDidMount() {
        this.checkIfUserExists();
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
            this.setState({ userName: user[0].name, userId: user[0].id });
            this.getFriendRank();
        }
    }

    getFriendRank = async () => {
        console.log("in get friends rank");
        const response = await quiz.get(`/${this.state.userName}/${this.state.userId}/friendsrank`);
        const data = response.data;
        // console.log(data);
        this.setState({ friendsRank: [...data] });
        console.log(data);
    }

    renderFriendsRank = () => {
        if (this.state.friendsRank.length !== 0) {
            const friendsRank = [...this.state.friendsRank];
            return (
                friendsRank.map((friend)=> {
                    return (
                        <h3 key={friend.id}>{friend.name} {friend.rank} points</h3>
                    )
                })
            )
        }
        else {
            return (
                <h3>Nobody guessed {this.state.userName}'s answers yet</h3>
            )
        }
    }


    render() {
        return (
            <>
                <h1>Who knows {this.state.userName} the best?</h1>
                <div className="rank-main-container">
                <div className="rank-sub-container">
                    {this.renderFriendsRank()}
                </div>
                </div>
            </>
        )
    }


}

export default DisplayFriendsRank;