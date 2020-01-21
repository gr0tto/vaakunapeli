import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// Import all images in image folder
// 1: "/static/media/Akaa.488eb19b.svg"
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[index] = r(item); 
      imagesCount += 1;
     });
    return images;
}

// Import all names from image titles
// 1: Akaa
function getNames(r) {
    let names = {};
    r.keys().map((item, index) => {
      var name;
      name = item.replace('./','');
      name = name.replace('.svg','');
      names[index] = name; 
     });
    return names;
}

var imagesCount = 0; //335
var currentImage;
var score = 0;
const images = importAll(require.context('./img/', false, /\.(png|jpe?g|svg)$/));
const names = getNames(require.context('./img/', false, /\.(png|jpe?g|svg)$/));
console.log(imagesCount);
console.log(currentImage);

function getNewOptions(n) {
  var false1;
  var false2;
  var false3;
  while(false1 != false2 != false3) {
    false1 = Math.floor(Math.random() * imagesCount);
    false2 = Math.floor(Math.random() * imagesCount);
    false3 = Math.floor(Math.random() * imagesCount);
  }
  var options = [names[currentImage], names[false1], names[false2], names[false3]];
  console.log(options);
  shuffle(options);
  return options;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


class Game extends React.Component {

  constructor(props) {
    super(props);
    currentImage = Math.floor(Math.random() * imagesCount);
    this.state = {
      current: currentImage,
      options: getNewOptions(currentImage),
      wrongGuesses: Array(),
      right: false
    };
  }
  refreshImage() {
    currentImage = Math.floor(Math.random() * imagesCount);
    this.setState({
      current: currentImage,
      options: getNewOptions(currentImage),
      wrongGuesses: Array(),
      right: false
    });
  }
  handleClick(i) {
    var wrong = this.state.wrongGuesses;
    if (this.state.options[i] == names[currentImage]) {
      //console.log("OIKEIN - " + this.state.options[i] + " on " + names[currentImage]);
      if (wrong.length < 1) {
        score += 200;
        console.log("BONUS!");
      }
      score += 200;
      this.refreshImage();
    } else {
      //console.log("VÄÄRIN - " + this.state.options[i] + " ei ole " + names[currentImage]);
      if (!wrong.includes(i)) {
        wrong.push(i);
        score -= 100;
      }
      this.setState({
        wrongGuesses: wrong
      });
    }
  }
  defineClass(i) {
    var guesses = this.state.wrongGuesses;
    if (guesses.includes(i)) {
      return "wrong";
    } 

  }
  render() {
    return (
      <div className="game" current={Math.floor(Math.random() * imagesCount)}>
        <div className="score">
          {score}
        </div>
        <div className="vaakuna">
          <img src={images[this.state.current]} />
        </div>
        <div className="monivalinta">
          <button className={this.defineClass(0)} onClick={() => this.handleClick(0)}>{this.state.options[0]}</button>
          <button className={this.defineClass(1)} onClick={() => this.handleClick(1)}>{this.state.options[1]}</button>
          <button className={this.defineClass(2)} onClick={() => this.handleClick(2)}>{this.state.options[2]}</button>
          <button className={this.defineClass(3)} onClick={() => this.handleClick(3)}>{this.state.options[3]}</button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
