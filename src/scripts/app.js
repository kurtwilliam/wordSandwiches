import React from 'react';
import ReactDOM from 'react-dom';
import Header from './containers/Header.js';
import Words from './containers/Words.js';
import Footer from './containers/Footer.js';

class App extends React.Component {
	constructor(props) {
	   super(props);
	   this.handleWordLengthChange = this.handleWordLengthChange.bind(this);
	   this.handleNumberOfWordsChange = this.handleNumberOfWordsChange.bind(this);
	   this.state = {length: 'short', numberOfWords: 7,}
	}
	handleWordLengthChange(wordLength) {
		this.setState({length: wordLength})
	}
	handleNumberOfWordsChange(numberOfWords) {
		this.setState({numberOfWords:numberOfWords})
	}

	render(){
		return (
			<div className="enclosing">
				<Header onWordLengthChange={this.handleWordLengthChange} length={this.state.length} numberOfWords={this.state.numberOfWords} onNumberOfWordsChange={this.handleNumberOfWordsChange} />
				<Words length={this.state.length} numberOfWords={this.state.numberOfWords} />
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));