import React from 'react';

export default class Difficulty extends React.Component{
	render(){
		return(
			<section className="difficulty">
				<div className="difficulty-length difficulty-child">
					<h4>Word Length</h4>
					<Length name="Short" value="short" onWordLengthChange={this.props.onWordLengthChange} length={this.props.length} />
					<Length name="Medium" value="med" onWordLengthChange={this.props.onWordLengthChange} length={this.props.length} />
					<Length name="Long" value="long" onWordLengthChange={this.props.onWordLengthChange} length={this.props.length} />	
				</div>
				<div className="difficulty-number difficulty-child">
					<h4>Number of Words</h4>
					<NumberOfWords name="6" value="6" onNumberOfWordsChange={this.props.onNumberOfWordsChange} numberOfWords={this.props.numberOfWords} className="difficultySelected" />
					<NumberOfWords name="8" value="8" onNumberOfWordsChange={this.props.onNumberOfWordsChange} numberOfWords={this.props.numberOfWords} />
					<NumberOfWords name="10" value="10" onNumberOfWordsChange={this.props.onNumberOfWordsChange} numberOfWords={this.props.numberOfWords} />	
				</div>
			</section>
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
		this.props.onNumberOfWordsChange(this.props.value);
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

// <div className="difficulty-frequency">
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