import React, { Component } from 'react';
import './App.css';
//  my compoenent
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import IconCard from './components/IconCard';
import Icons from './icons.json';
//
import "./components/IconCard.css";
//
// import "tachyons";
// import "hover";
// import "animate";


const shuffleArray = (array) => {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }
  return array;
};
class App extends Component {

  state = {
    currentScore: 0,
    topScore: 0,
    result: "",
    clicked: [],
    Icons,
    gameOver: false
  };

  // When the page loads and the component mounts,
  // display starting message
  componentDidMount() {
    this.setState({result: "Click a player to get started"})
  }

  // When a player gets clicked,
  // increase points and add id of element to array.
  clickedPlayer = (id) => {
    console.log(`Picture clicked with id: ${id}`);
    if(!this.state.clicked.includes(id)){
      this.pointIncrease();
      this.state.clicked.push(id);
      this.setState({
        gameOver: false
      });
    } else {
      this.resetGame();
    }
  }

  // When the user makes a new click, increment the points by 1
  // and check if the user has won
  pointIncrease = () => {
    let score = this.state.currentScore + 1;
    console.log(`the score is ${score}`);
    if (score === this.state.Icons.length) {
      this.setState({
        result: "You win! Start clicking to play again!",
        topScore: score,
        currentScore: 0,
        clicked: [],
        Icons,
        gameOver: false
      });
    } else if (score > this.state.topScore) {
      this.setState({
        topScore: score,
        currentScore: score,
        result: "Correct! New high score!",
      });
    } else {
      this.setState({
        currentScore: score,
        result: "Correct!"
      });
    }
    this.resetIconArray();
  }

  // reset the game when the user chooses a duplicate
  resetGame = () => {
    this.setState({
      points: 0,
      currentScore:0,
      topScore: this.state.topScore,
      result: "You Loss!",
      clicked: [],
      Icons,
      gameOver: true
    });
    console.log('Game over? ', this.state.gameOver);
    this.resetIconArray();
  }

  // set the array to be mapped to a new scrambled version using shuffle algorithm
  resetIconArray = () => {
    let newScramble = shuffleArray(Icons);
    this.setState({Icons: newScramble})
  }

  render() {
    return (
      <div className='container'>
        <NavBar topScore={this.state.topScore} currentScore={this.state.currentScore} status={this.state.result}/>
        <Banner />
        <div className='mainStyle'>
        {this.state.Icons.map(icon => (
        <IconCard
          id={icon.id}
          image={icon.image}
          clickedPlayer={this.clickedPlayer}
        />
        ))}
        </div>
      </div>
    );
  }
}

export default App;