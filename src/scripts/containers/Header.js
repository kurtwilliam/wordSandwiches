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
					<button className="difficulty-settings" onClick={this.settings}>Difficulty</button>
					<Difficulty onWordLengthChange={this.props.onWordLengthChange} numberOfWords={this.props.numberOfWords} onNumberOfWordsChange={this.props.onNumberOfWordsChange} length={this.props.length} />
				</div>
				<img className="header-logo" src="assets/logo.png" alt="Word Sandwiches Logo" />
				<div className="settings-container header-cont">
					<button className="settings-settings" onClick={this.settings}>Settings</button>
					<Settings />
				</div>
				<div className="settings-overlay" onClick={this.settings}></div>
			</header>
		)
	}
}