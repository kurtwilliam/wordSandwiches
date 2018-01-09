import React from 'react';
import Settings from '../components/Settings.js'

export default class Header extends React.Component{
	// constructor(){
		// super();
		// this.modal = this.modal.bind(this);
		// this.close = this.close.bind(this);
	// }
	settings(){
		// Get the modal, modalBtn, and closing span
		let settings = document.querySelector('.settings');
		let settingsOverlay = document.querySelector('.settingsOverlay');
		// let btn = document.getElementById("modalBtn");

		if (settings.style.display === 'block') {
			settings.style.display = 'none';
			settingsOverlay.style.display = 'none';
		} else {
			settings.style.display = 'block';
			settingsOverlay.style.display = 'block';
		}

		// When the user clicks on the button, open the modal 
		// btn.onclick = function() {
		    // modal.style.display = "block";
		// }
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
				<h1>Word Sandwiches</h1>
				<button onClick={this.settings}>Settings</button>
				<Settings onWordLengthChange={this.props.onWordLengthChange} numberOfWords={this.props.numberOfWords} onNumberOfWordsChange={this.props.onNumberOfWordsChange} length={this.props.length} />
				<div className="settingsOverlay" onClick={this.settings}></div>
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