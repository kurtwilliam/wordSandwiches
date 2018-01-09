import React from 'react';
import {ajax} from 'jquery';

// Declare API information
const app_id = "dba7c455";
const app_key = "8ff409b8e0d5a7ff34466546fe3d19f8";

// let offsetRando = Math.floor(Math.random()*2195);
let wordApp = {};

export default class Words extends React.Component{
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
			gameOver: '',
			rightAnswers: [],
			multiplier: 0,
			update:false,
		}
		this.randoArrayPull = this.randoArrayPull.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.inputVer = this.inputVer.bind(this);
		this.points = this.points.bind(this);
		this.gameOver = this.gameOver.bind(this);
		this.multiplierCalc = this.multiplierCalc.bind(this);
		this.defineWord = this.defineWord.bind(this);
	}
	randoArrayPull(i) {
		let wordsArray = this.state.words;

		//Only run function if the Ajax request has populated a list
		if ( wordsArray.length > 0 ) {
			
			// Reset timer upon starting
			// Clear content in main div 
			this.setState({
				points:30,
				gameOver:'',
				rightAnswers:[]
			}) 

			// filter words for various properties
			const words = this.state.words;
			const wordLength = this.props.length;
			const numberOfWords = this.props.numberOfWords

			function wordFilter(word) {
				let min, max;
				// Gets state of wordlength button and use it to figure out how to filter words
				if (wordLength === 'med') {
					min = 6;
					max = 8;
				} else if (wordLength === 'long') {
					min = 7;
					max = 10;
				} else {
					min = 5;
					max = 7;
				}

				if (word.length >= min && word.length <= max) {
					return word;
				}
				return;
			}

			const filteredWords = words.filter(wordFilter)

			console.log(filteredWords)

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

			  	const smallArray = array.slice(0, numberOfWords);
			  	return smallArray;
			}

			// Shuffle word array
			// filter words first
			// Select the first few results based on the difficulty and store them in another array, the answerKey
			// Use this to later verify if a user inputted a real result, and to associate word scores with it
			const answerKey = shuffle(filteredWords);

			// Empty answerKey
			wordApp.answerKey = [];

			// Put each word in the answer key
			for ( let i = 0; i < answerKey.length; i++ ) {
				wordApp.answerKey.push(answerKey[i])
			}

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

			// Update state of points
			this.setState({
				points: points
			})

			// stop the points from decreasing at -30 points
			if(points === 0) {
				window.clearInterval(wordApp.countdown);
				this.gameOver();
			}
		},1000);
	}
	multiplierCalc(i) {
		// Oxford Dictionary LexiStats call
		
		const word = wordApp.answerKey[i];
		const reqUrl = `https://od-api.oxforddictionaries.com:443/api/v1/stats/frequency/words/en/?corpus=nmc&lemma=${word}&offset=0&limit=100`

		console.log(reqUrl)
		console.log(word)

		ajax({
			url: `http://proxy.hackeryou.com`, 
			type: 'GET',
			dataType: 'json',
			data:{
				reqUrl: `https://od-api.oxforddictionaries.com:443/api/v1/stats/frequency/word/en/?corpus=nmc&lemma=hello`,
				xmlToJSON: "false",
				proxyHeaders:{
					"Accept": "application/json",
					"app_id": app_id,
					"app_key": app_key
				},
			}
			}).then((data) =>{
				console.log(data)
				// this.setState({
				// 	multiplier: data.results
				// });
		});
	}
	defineWord(e){
		// When you click on a result, show the definition!
		const target = e.currentTarget.innerHTML;
		const thisEl = document.getElementById(`word${target}`);
		let definition;
		ajax({
			url: `http://proxy.hackeryou.com`, 
			type: 'GET',
			dataType: 'json',
			data:{
				reqUrl: `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${target}`,
				xmlToJSON: "false",
				proxyHeaders:{
					"Accept": "application/json",
					"app_id": app_id,
					"app_key": app_key
				},
			},
			success: (data) => {
				console.log(data)
				if (data.results[0].lexicalEntries[0]) { 
					if (data.results[0].lexicalEntries[0].senses) {
						definition = data.results[0].lexicalEntries[0].senses[0].definitions[0]
					} else if (data.results[0].lexicalEntries[0].entries) {
						definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
					}
				} else if (data.results[0].entries[0].senses[0].definitions[0]) { 
					definition = data.results[0].entries[0].senses[0].definitions[0] 
				}
				thisEl.innerHTML = definition;
			},
			error: () => {
				thisEl.innerHTML = 'Sorry! Either no definition, plural, name, inflection or error!'
			}
		})
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
		if ( this.state.points < 1 || this.state.wordStr.length <= 2 ){

			// Clear counter, set gameOver state to display correct and incorrect words
			let correctAnswersStr;
			if (this.state.rightAnswers.length) { 
				correctAnswersStr = this.state.rightAnswers.map(i => {
					const newId = `word${i}`
					return (
						<div className="resultTableAnswerRow" key={i}>
							<p className="resultTableAnswer changeStyle" onClick={this.defineWord}>{i}</p>
							<span id={newId}></span>
						</div>
					)
				})
			} else {
				correctAnswersStr = <p className="resultTableAnswer">None 😣</p> 
			}

			let incorrectAnswersStr;
			if (this.state.answerKeys.length) { 
				incorrectAnswersStr = this.state.answerKeys.map(i => {
					const newId = `word${i}`
					return (
						<div className="resultTableAnswerRow" key={i}>
							<p className="resultTableAnswer changeStyle" onClick={this.defineWord} key={i}>{i}</p>
							<span id={newId}></span>
						</div>
					)
				})
			} else {
				incorrectAnswersStr = <p className="resultTableAnswer">None 🤗</p> 
			}
			let scoreLength;
			const wordLength = this.props.length;
			if (wordLength === 'short') { scoreLength = 1 }
			else if ( wordLength === 'med' ) { scoreLength = 2 }
			else if ( wordLength === 'long' ) { scoreLength = 3 }

			// const totalScore = this.props.numberOfWords * scoreLength * this.state.points 

			const gameDiv = (
				<div className="result">
					<h2>Score: </h2>
					<p className="resultCalc">Number of Words: {this.props.numberOfWords}, Word Length: {this.props.length}, Word Difficulty: ??</p>
					<p className="resultScore">{this.state.points}</p>
					<div className="resultTable">
						<div className="resultTableWin">
							<h4>Correct Words</h4>
							{ correctAnswersStr }
						</div>
						<div className="resultTableLose">
							<h4>Incorrect Words</h4>
							{ incorrectAnswersStr }
						</div>
					</div>
				</div>
			);
			this.setState({
				gameOver: gameDiv,
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
		let rightAnswers = this.state.rightAnswers;
		const main = document.querySelector('.main');
		let newWordPara;

		// Find the index of the answerKeys from the userInput if they match
		let indexKey = inputState.indexOf(this.state.userInput);

		// Search wordPara for userInput
		const wordStrInput = wordPara.search(inputUser);

		// if correct (can find it in the string and answerKey)
		if ( indexKey >= 0 && wordStrInput >= 0 ) {
			// Add background green for right then remove
			main.classList.add('correctAnswer');
			setTimeout(function(){
				main.classList.remove('correctAnswer');
			},100),

			// Remove user input from Array if right and push to right answers
 			inputState.splice(indexKey, 1);
 			rightAnswers.push(inputUser);

 			// Remove user input from word paragraph 
 			newWordPara = wordPara.replace(inputUser, '');
 			wordPara = newWordPara;
 			// Add 5 points to score
 			this.setState({
 				points: newPoints + 5,
 			})

		} else { 
			// Add background green for right then remove
			main.classList.add('incorrectAnswer');
			setTimeout(function(){
				main.classList.remove('incorrectAnswer');
			},100),

			// remove one point
			this.setState({
				points: newPoints -1,
			})
		}
		// Update the state of the answerKeys, reset input field, and update the word paragraph
		this.setState({
			answerKeys: inputState,
			userInput: '',
			wordStr: wordPara,
			rightAnswers,
		},() => { this.gameOver() });
	}
	render(){
		return(
			<div className="wrapper">
				<div className="triangleLeft"></div>
				<div className="triangleRight"></div>
				<div className="main">
					<h4 className="points">Timer: {this.state.points}</h4>
					<div id="gameDiv">
						<p id="gameDivP" className="changeStyle" ref>{this.state.wordStr}</p>
						<span id="gameDivSpan">{this.state.gameOver}</span>
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
		// Convert the 20k words text file into an array, split from line breaks as the text file has it
		let allWords;
		function readTextFile(file) {
			const wordList = new XMLHttpRequest();
			wordList.open("GET", file, false);
			wordList.onreadystatechange = function () {
				if(wordList.readyState === 4) {
				   if(wordList.status === 200 || wordList.status == 0) {
				      allWords = Array.from(wordList.responseText.split("\n"));
				   }
				}
			}
			wordList.send(null);
		};

		// readTextFile('../../words/20k.txt')
		readTextFile('http://kurtwilliam.com/word-sandwiches/words/20k.txt')

		this.setState({
			words: allWords
		})
	}
}