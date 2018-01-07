import React from 'react';
import ReactDOM from 'react-dom';
import Header from './containers/Header.js';
import Words from './containers/Words.js';
import Footer from './containers/Footer.js';

class App extends React.Component {
	constructor(props) {
	   super(props);
	   this.handleWordLengthChange = this.handleWordLengthChange.bind(this);
	   this.state = {length: 'short'}
	}
	handleWordLengthChange(wordLength) {
		this.setState({length: wordLength})
	}
	render(){
		return (
			<div className="enclosing">
				<Header onWordLengthChange={this.handleWordLengthChange} length={this.state.length} />
				<Words length={this.state.length} />
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));