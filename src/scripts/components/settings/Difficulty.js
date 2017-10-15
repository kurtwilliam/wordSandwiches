import React from 'react';

export default class Difficulty extends React.Component{
	constructor(){
		super();
		this.state = ({ wordLength: '>2,<5' });
	}
	render(){
		console.log(this.state.wordLength)
		return(
			<div className="settings-difficulty">
				<h3>Difficulty</h3>
				<div className="settings-difficulty-length">
					<h4>Word Length</h4>
					<Length name="Short" value=">2,<5" wordLength={this.state.wordLength} />
					<Length name="Medium" value=">3,<6" wordLength={this.state.wordLength} />
					<Length name="Long" value=">4,<7" wordLength={this.state.wordLength} />	
				</div>
				<div className="settings-difficulty-frequency">
					<h4>Word Use Frequency</h4>
					<Frequency name="Common" />
					<Frequency name="UnCommon" />
					<Frequency name="Rare" />				
				</div>
				<div className="settings-multiplier">
					<h4>Your Score Multiplier:</h4>
					<p></p>
				</div>
			</div>
		)
	}
}

class Length extends React.Component {
	constructor(props){
		super(props);
		this.updateLength = this.updateLength.bind(this);
		// this.state = { wordLength: '>2,<5' };
	}
	updateLength(){
		// Make the state of wordLength update to the value of the button that is pressed.
		this.setState({ wordLength: this.props.value })

		// Pass word length up to Settings VIA changing state for parent
		this.props.callBackFromParent(this.state.wordLength);
	}
	render() {
		return (
			<button onClick={() => this.updateLength()}>{this.props.name}</button>
		)
	}
}

class Frequency extends React.Component {
	constructor(props){
		super(props);
		this.updateFrequency = this.updateFrequency.bind(this);
		// this.state = { wordFrequency: 'Roboto, sans-serif' };
	}
	updateFrequency(){
		// Make the state of fontFamily update to the value of the button that is pressed.
		// this.setState({ fontFamily: this.props.value })

		// Set the font-family style in the game paragraph to the button that is pressed. 
		// let gameDivP = document.getElementById('gameDivP');
		// gameDivP.style.fontFamily = this.state.fontFamily;
	}
	render() {
		// let fontFam = { fontFamily: this.props.value };

		return (
			<button onClick={() => this.updateFrequency()}>{this.props.name}</button>
		)
	}
}