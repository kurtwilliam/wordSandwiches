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
				<div className="settings-difficulty-number">
					<NumberOfWords name="7" value="7" onNumberOfWordsChange={this.props.onNumberOfWordsChange} numberOfWords={this.props.numberOfWords} className="difficultySelected" />
					<NumberOfWords name="10" value="10" onNumberOfWordsChange={this.props.onNumberOfWordsChange} numberOfWords={this.props.numberOfWords} />
					<NumberOfWords name="13" value="13" onNumberOfWordsChange={this.props.onNumberOfWordsChange} numberOfWords={this.props.numberOfWords} />	
				</div>
			</div>
		)
	}
}

class NumberOfWords extends React.Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		document.querySelectorAll('.diffSelNum').forEach(i => {
			i.classList.remove('diffSelNum');
		})
		e.currentTarget.classList.add('diffSelNum')
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

class Length extends React.Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		document.querySelectorAll('.diffSelLen').forEach(i => {
			i.classList.remove('diffSelLen');
		})
		e.currentTarget.classList.add('diffSelLen')
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

// <div className="settings-difficulty-frequency">
// 	<h4>Word Use Frequency</h4>
// 	<Frequency name="Common" />
// 	<Frequency name="UnCommon" />
// 	<Frequency name="Rare" />				
// </div>

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