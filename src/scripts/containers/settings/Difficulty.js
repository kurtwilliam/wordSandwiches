import React from 'react';

export default class Difficulty extends React.Component{
	render(){
		return(
			<div className="settings-difficulty">
				<h3>Difficulty</h3>
				<div className="settings-difficulty-length">
					<h4>Word Length</h4>
					<Length name="Short" value="short" onWordLengthChange={this.props.onWordLengthChange} length={this.props.length} />
					<Length name="Medium" value="med" onWordLengthChange={this.props.onWordLengthChange} length={this.props.length} />
					<Length name="Long" value="long" onWordLengthChange={this.props.onWordLengthChange} length={this.props.length} />	
				</div>
				<div className="settings-multiplier">
					<h4>Your Score Multiplier:</h4>
					<p></p>
				</div>
			</div>
		)
	}
}

// <div className="settings-difficulty-frequency">
// 	<h4>Word Use Frequency</h4>
// 	<Frequency name="Common" />
// 	<Frequency name="UnCommon" />
// 	<Frequency name="Rare" />				
// </div>

class Length extends React.Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		// pass wordLength up to app to customize settings length
		this.props.onWordLengthChange(this.props.value);
	}
	render() {
		const length = this.props.length;
		return (
			<button onClick={this.handleChange}>{this.props.name}</button>
		)
	}
}

class Frequency extends React.Component {
	constructor(props){
		super(props);
		this.updateFrequency = this.updateFrequency.bind(this);
		// this.state = { wordFrequency: 'Roboto, sans-serif' };
	}
	render() {
		// let fontFam = { fontFamily: this.props.value };

		return (
			<button onClick={() => this.updateFrequency()}>{this.props.name}</button>
		)
	}
}