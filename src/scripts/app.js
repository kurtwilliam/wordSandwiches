import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.js';
import Magic from './components/Magic.js';
import Footer from './components/Footer.js';

class App extends React.Component {
	render(){
		return (
			<div className="enclosing">
				<Header />
				<Magic />
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));