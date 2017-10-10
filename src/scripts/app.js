import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.js';
import Magic from './components/Magic.js';
import Footer from './components/Footer.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({ wordLength: '>2,<5' })
		this.wordLengthCallback = this.wordLengthCallback.bind(this);
	}
	wordLengthCallback(dataFromSettings) {
		console.log(dataFromSettings)
		if ( dataFromSettings !== undefined ){
	   	this.setState({ wordLength: dataFromSettings });
		}
	}
	render(){
		return (
			<div className="enclosing">
				<Header />
				<Magic callBackFromParent={this.wordLengthCallback} wordLength={this.state.wordLength} />
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));