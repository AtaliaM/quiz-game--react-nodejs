import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import AddNewUser from './components/AddNewUser';
import PostFriendGuesses from './components/PostFriendGuesses';
import DisplayFriendsRank from './components/DisplayFriendsRank';
import Homepage from './components/Homepage';
import Header from './components/Header';
import Footer from './components/Footer';



class App extends React.Component {
    render() {
        return (
          <div className="App">
            <BrowserRouter>
              <div>
                <Header/> 
                <Route path="/" exact component={Homepage} />
                <Route path="/user/create" exact component={AddNewUser} />
                <Route path="/:username/:userid/answerquiz" exact component={PostFriendGuesses} />
                <Route path="/:username/:userid/friendsrank" exact component={DisplayFriendsRank} />
                <Footer/>
              </div>
            </BrowserRouter>
          </div>
        );
    
      }
  }
  
  export default App;