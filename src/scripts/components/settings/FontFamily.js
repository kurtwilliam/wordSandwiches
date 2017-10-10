import React from 'react';

// Make global array to append value of each font in settings, for google fonts call. 
let fontList = [];

export default class FontFamily extends React.Component{
	render(){
		return(
			<div className="settings-fontFamily">
				<h3>Font</h3>
				<ChooseFont value="'Raleway', sans-serif" name='Raleway' />
				<ChooseFont value="'Montserrat', sans-serif" name='Montserrat' />
				<ChooseFont value="'Roboto', sans-serif" name='Roboto' />
			</div>
		)
	}
}

class ChooseFont extends React.Component {
	constructor(props){
		super(props);
		this.changeFont = this.changeFont.bind(this);
		this.state = { fontFamily: 'Roboto, sans-serif' };
	}
	componentWillMount() {
		// Get head tag and push in link with Google Font options
		const head = document.getElementsByTagName('head');
		const currentHead = head[0].innerHTML;
		let newHead = currentHead;

		// Add new font to font list and format like a google font
		const fontName = this.props.name;
		fontList.push(fontName);
		const newFontList = fontList.join('|')

		// Make the google font stylesheet call equal to the fonts selections that are in the settings
		let googleFontLink = `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${newFontList}">`
		newHead = currentHead + googleFontLink;

		// If the current <head> doesn't have the font link in it put it in
		if ( currentHead.search(googleFontLink) === -1 ) {
			document.getElementsByTagName('head')[0].innerHTML = newHead
		}
	}
	changeFont(){
		// Make the state of fontFamily update to the value of the button that is pressed.
		this.setState({ fontFamily: this.props.value })

		// Set the font-family style in the game paragraph to the button that is pressed.
		let gameDivH2 = document.getElementById('gameDivH2');
		gameDivH2.style.fontSize = this.state.fontFamily;

		let gameDivP = document.getElementById('gameDivP');
		gameDivP.style.fontFamily = this.state.fontFamily;
		
		// Show the button is active when clicking ...
	}
	render() {
		let fontFam = { fontFamily: this.props.value };

		return (
			<button onClick={() => this.changeFont()} style={fontFam}>{this.props.name}</button>
		)
	}
}