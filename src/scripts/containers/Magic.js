import React from 'react';
import {ajax} from 'jquery';

// Declare API information
const app_id = "dba7c455";
const app_key = "8ff409b8e0d5a7ff34466546fe3d19f8";

let offsetRando = Math.floor(Math.random()*2195);
let wordApp = {};

export default class Magic extends React.Component{
	// Set and bind states 
	constructor(props) {
		super(props);
		this.state = {
			words: [],
			userInput: "",
			answerKeys: [],
			wordStr: '',
			points: 30,
			noWords: '10',
			gameOver: ''
		}
		this.randoArrayPull = this.randoArrayPull.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.inputVer = this.inputVer.bind(this);
		this.points = this.points.bind(this);
		this.gameOver = this.gameOver.bind(this);
	}
	// Run this function when submitting user input
	randoArrayPull(i) {
		let wordsArray = this.state.words;

		//Only run function if the Ajax request has populated a list
		if ( wordsArray.length > 0 ) {
			
			// Reset timer upon starting
			// Clear content in main div 
			this.setState({
				points:30,
				gameOver:''
			}) 

			// Filter array for any non alphabet characters
			let filteredWords = wordsArray.filter((word) => {
				return word.word.match(/\'|\-|\´|\"|\^|\ |\//ig) === null
			})
			
			// Create shuffling function
			function shuffle(array) {
			  var currentIndex = array.length, temporaryValue, randomIndex;

			  // While there remain elements to shuffle
			  while (0 !== currentIndex) {

			    // Pick a remaining element
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element
			    temporaryValue = array[currentIndex];
			    array[currentIndex] = array[randomIndex];
			    array[randomIndex] = temporaryValue;
			  }
			  return array;
			}

			// Shuffle filteredWords array
			filteredWords = shuffle(filteredWords);

			// Select the first few results based on the difficulty and store them in another array, the answerKey
			// Use this to later verify if a user inputted a real result

			const answerKey = filteredWords.slice(0, 10);

			// Empty answerKey
			wordApp.answerKey = [];

			// Put each word in the answer key
			for ( i = 0; i < answerKey.length; i++ ) {
				wordApp.answerKey.push(answerKey[i].word)
			}

			console.log(wordApp.answerKey)

			// Make a string we can combine all of the words in!
			let wordStr = ``;

			// Iterate through each word in the answer key and insert it into wordStr 
			for (i = 0; i < wordApp.answerKey.length; i++) {
				// redefine wordStr's length each iteration to randomly insert a word
				let wordStrLen = wordStr.length;
				// set a var = new word
			   let word = wordApp.answerKey[i];
			   // generate a random position to insert the word into the full wordStr
			   let position = Math.floor(Math.random()*wordStrLen);
			   // Cut up wordStr in a random place, insert this iteration of the word at a random position, then put wordStr back together
			   let fullWord = [wordStr.slice(0, position), word, wordStr.slice(position)].join('');
				// set value of wordStr to newly generated string fullWord
				wordStr = fullWord;
			}
			// Update the states with the words we just generated
			this.setState({
				answerKeys: wordApp.answerKey,
				wordStr
			})
			// Start the clock! 
			this.points();

			// Add the class of hidden to new quiz button so you can't generate a new puzzle. Sorry - I tried to store these in variables but for some reason it didn't work when I did
			document.getElementById("quizButton").className += " hidden";

			// hide inputs
			document.getElementById("userInput").className =
			   document.getElementById("userInput").className.replace
			      ( /(?:^|\s)hidden(?!\S)/g , '' )
			document.getElementById("userInputBtn").className =
			   document.getElementById("userInputBtn").className.replace
			      ( /(?:^|\s)hidden(?!\S)/g , '' )

      } else {
      	// If no Ajax call return function
      	return;
		}
	}
	points(){
		// Create a points system that goes down by 1 point every second. 
		wordApp.countdown = window.setInterval(() => {
			// Update the h4 text with the number of seconds
		  	let points = this.state.points;
			// Decrement the number of seconds left
			points = points -1;

			// stop the points from decreasing at -30 points
			if(points <= 0) {
				window.clearInterval(wordApp.countdown);
				this.gameOver();
			}
			// Update state of points
			this.setState({
				points: points
			}) 
		},1000);
	}
	handleChange(e){
		// Update user input when it is changed
		e.preventDefault();

		this.setState({
			userInput: e.target.value,
		})
	}
	gameOver(){
		// Make events for if the timer reaches 0 or if there are no more words
		// So if the timer runs out...
		if ( this.state.points <= 1 ){
			// Add a space for each element left in the answer key by mapping array
			let answers = this.state.answerKeys;

			function addSpace(answer){
				return (' ' + answer);
			}

			// Clear counter, set gameOver state to display message, reset wordStr
			this.setState({
				gameOver: `Aww dangit, you lose! Words you missed: ${answers.map(addSpace)}`,
				wordStr: ''
			})

			// show new quiz button, hide inputs - sorry, I tried to clean these up by storing them in variables but it didn't work
			document.getElementById("quizButton").className = document.getElementById("quizButton").className.replace( /(?:^|\s)hidden(?!\S)/g , '' );

			document.getElementById("userInput").className += " hidden";
			document.getElementById("userInputBtn").className += " hidden";

		// Else, if the user submits the form and there are no words left in the string
		} else if ( this.state.wordStr.length <= 5 ) {
			// Clear counter, set gameOver state to display message, reset wordStr
			this.setState({
				gameOver: `Congraulations, you win with a score of ${this.state.points+5}!`,
				wordStr: ''
			})
			window.clearInterval(wordApp.countdown);
			// show new quiz button, hide inputs
			document.getElementById("quizButton").className = document.getElementById("quizButton").className.replace( /(?:^|\s)hidden(?!\S)/g , '' );

			document.getElementById("userInput").className += " hidden";
			document.getElementById("userInputBtn").className += " hidden";
		} 
	}
	inputVer(e){
		// Make function that on submission of a user input, verifies if the value inputted matches the value of a value in the answerKey array. 
		// If it does, make it evaluate the wordStr to find a matching string.
		// If it does, add +5 to score, delete the value from the key, and from the string displayed on the page.
		// Else, -1 from the score

		// Prevent browser refresh
		e.preventDefault();

		// Make clone of answerKeys, userInput, wordStr, and points
		let inputState = Array.from(this.state.answerKeys);
		let inputUser = this.state.userInput;
		let wordPara = this.state.wordStr;
		let newPoints = this.state.points;
		const main = document.querySelector('.main');

		// Find the index of the answerKeys from the userInput if they match
		let indexKey = inputState.indexOf(this.state.userInput);

		// Search wordPara for userInput
		const wordStrInput = wordPara.search(inputUser);

		// if correct (can find it in the string and answerKey)
		if ( indexKey >= 0 && wordStrInput >= 0 ) {
			// Add background green for right
			main.classList.add('correctAnswer');

			const wordDiv = document.createElement('div')
			wordDiv.className = 'hideWord';
			wordDiv.innerHTML = inputUser;

			// Remove user input from Array 
			inputState.splice(indexKey, 1);

			// Remove user input from word paragraph 
			let newWordPara = wordPara.replace(inputUser, wordDiv);
			wordPara = newWordPara;
			// Add 5 points to score
			this.setState({
				points: newPoints + 5
			})
			main.classList.remove('correctAnswer');

		} else { 
			main.classList.add('incorrectAnswer');

			// remove one point
			this.setState({
				points: newPoints -1
			})

			main.classList.remove('incorrectAnswer');
		}
		// Update the state of the answerKeys, reset input field, and update the word paragraph
		this.setState({
			answerKeys: inputState,
			userInput: '',
			wordStr: wordPara
		});
		// If there is just one word left, upon submission run the gameOver function
		if ( this.state.wordStr.length <= 5 ){
			this.gameOver();
		}
	}
	render(){
		return(
			<div className="wrapper">
				<div className="triangleLeft"></div>
				<div className="triangleRight"></div>
				<div className="main">
					<h4 className="points">Score: {this.state.points}</h4>
					<div id="gameDiv">
						<p id="gameDivP" ref>{this.state.wordStr}</p>
						<h2 id="gameDivH2">{this.state.gameOver}</h2>
					</div>
					<button className='quizButton' id="quizButton" onClick={this.randoArrayPull}>Feed me!</button>
					<form onSubmit={this.inputVer}>
						<input id='userInput' className="userInput hidden" name="userInput" value={this.state.userInput} onChange={this.handleChange} placeholder="type a word here!" autoCorrect="off" autoComplete="off" autoCapitalize="none" />
						<button id='userInputBtn' className="hidden" type="submit">Answer!</button>
					</form>
				</div>
			</div>
		)
	}
	componentDidMount(){
		console.log(this)
		// Oxford Dictionary API call
		ajax({
			url: `http://proxy.hackeryou.com`, 
			type: 'GET',
			dataType: 'json',
			data:{
				reqUrl: "https://od-api.oxforddictionaries.com:443/api/v1/wordlist/en/lexicalCategory%3DVerb",
				xmlToJSON: "false",
				proxyHeaders:{
					"Accept": "application/json",
					"app_id": app_id,
					"app_key": app_key
				},
				params:{
					offset: offsetRando,
					word_length: '>4<6',
					exact: false
				}
			}
			}).then((data) =>{
				this.setState({
					words: data.results
				});
		});
	}
}

// <GetTest />

class GetTest extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			newWord: "",
			word: [],
			wordFreq: [],
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e){
		// Update user input when it is changed
		e.preventDefault();

		this.setState({
			newWord: e.target.value,
		})
	}
	render(){
		return(
			<div className="ajaxCall">
				<form onSubmit={this.handleSubmit}>
					<input id='ajaxInput' className="" name="ajaxInput" value={this.state.newWord} onChange={this.handleChange} placeholder="" autoCorrect="off" autoComplete="off" autoCapitalize="none" />
					<button id='ajaxBtn' className="" type="submit">ajax</button>
				</form>
			</div>
		)
	}
	handleSubmit(e){
		e.preventDefault();

		// Oxford Dictionary API call
		console.log('butt munch')
		ajax({
			url: `http://proxy.hackeryou.com`, 
			type: 'GET',
			dataType: 'json',
			data:{
				reqUrl: `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${this.state.newWord}`,
				xmlToJSON: "false",
				proxyHeaders:{
					"Accept": "application/json",
					"app_id": app_id,
					"app_key": app_key
				},
			}
			}).then((data) =>{
				this.setState({ word: data.results });
				console.log(this.state.word)

				ajax({
					url: `http://proxy.hackeryou.com`, 
					type: 'GET',
					dataType: 'json',
					data:{
						reqUrl: `https://od-api.oxforddictionaries.com:443/api/v1/stats/frequency/words/en/?wordform=${this.state.newWord}`,
						xmlToJSON: "false",
						proxyHeaders:{
							"Accept": "application/json",
							"app_id": app_id,
							"app_key": app_key
						},
					}
					}).then((data) =>{
						console.log(data)
						this.setState({ wordFreq: data.results });
						console.log(this.state.wordFreq)
				});
		});
	}
}