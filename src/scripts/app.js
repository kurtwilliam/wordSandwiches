import React from 'react';
import ReactDOM from 'react-dom';
import Header from './containers/Header.js';
import Magic from './containers/Magic.js';
import Footer from './containers/Footer.js';

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