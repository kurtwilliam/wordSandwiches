import React from 'react';
import Settings from '../components/Settings.js'
import Difficulty from '../components/Difficulty.js'

export default class Header extends React.Component{
	// constructor(){
		// super();
		// this.modal = this.modal.bind(this);
		// this.close = this.close.bind(this);
	// }
	settings(e) {
		// Get the modal, modalBtn, and closing span
		const settings = document.querySelector('.settings');
		const difficulty = document.querySelector('.difficulty');
		const settingsOverlay = document.querySelector('.settings-overlay');

		if (e.currentTarget.innerHTML === 'Difficulty') {
			difficulty.classList.toggle('show');
			settingsOverlay.classList.toggle('show');
		} else if (e.currentTarget.innerHTML === 'Settings') {
			settings.classList.toggle('show');
			settingsOverlay.classList.toggle('show');
		} else if (e.currentTarget.classList.contains('settings-overlay')){
			settings.classList.remove('show');
			difficulty.classList.remove('show');
			settingsOverlay.classList.remove('show');
		}
		console.log(e.currentTarget)
	}
	// close(){
	// 	let span = document.getElementById("close");
	// 	let modal = document.getElementById('modal');
	// 	// When the user clicks on the close button, closes modal
	// 	span.onclick = function() {
	// 	    modal.style.display = "none";
	// 	}
	// }
	// headerChange(e){
	// 	this.setState({
	// 		wordLength: e.target.value,
	// 	})
	// 	console.log(this.state.wordLength)
	// }
	render(){
		return(
			<header>
				<div className="difficulty-container header-cont">
					<button onClick={this.settings}>Difficulty</button>
					<Difficulty onWordLengthChange={this.props.onWordLengthChange} numberOfWords={this.props.numberOfWords} onNumberOfWordsChange={this.props.onNumberOfWordsChange} length={this.props.length} />
				</div>
				<h1>Word Sandwiches</h1>
				<div className="settings-container header-cont">
					<button onClick={this.settings}>Settings</button>
					<Settings />
				</div>
				<div className="settings-overlay" onClick={this.settings}></div>
			</header>
		)
	}
}

/*
<button id="modalBtn" onClick={this.modal}>
<i className="fa fa-info-circle" aria-hidden="true"></i>
</button>
<div id="modal">
	<div className="modalContent">
		<span id="close" onClick={this.close}>&times;</span>
		<p>Try to find all of the words! Words are 3-5 letters long and usually verbs. Each letter belongs to a word, and even if you guess a real word it might not be the right word. Good luck!</p>
	</div>
</div>
*/