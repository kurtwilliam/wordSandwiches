import React from 'react';

// Make global array to append value of each font in settings, for google fonts call. 
let fontList = [];

export default class FontFamily extends React.Component{
	render(){
		return(
			<div className="settings-fontFamily settings-child">
				<h3>Font</h3>
				<ChooseFont value='"Raleway", sans-serif' name='Raleway' />
				<ChooseFont value='"Montserrat", sans-serif' name='Montserrat' />
				<ChooseFont value='"Roboto", sans-serif' name='Roboto' />
			</div>
		)
	}
}

class ChooseFont extends React.Component {
	constructor(props){
		super(props);
		this.changeFont = this.changeFont.bind(this);
		this.state = { fontFamily: '"Roboto", sans-serif' };
	}
	changeFont(e){
		document.querySelectorAll('.diffSelFam').forEach(i => {
			i.classList.remove('diffSelFam');
		})
		e.currentTarget.classList.add('diffSelFam')
		// Make the state of fontFamily update to the value of the button that is pressed.
		this.setState({ fontFamily: this.props.value })

		// Set the font-family style in the game paragraph to the button that is pressed.
		let gameChange = document.querySelectorAll('.changeStyle');
		for (let i = 0; i < gameChange.length; i++ ) {
			gameChange[i].style.fontFamily = this.state.fontFamily;
		}
	}
	render() {
		let fontFam = { fontFamily: this.props.value };

		return (
			<button onClick={(e) => this.changeFont(e)} style={fontFam}>{this.props.name}</button>
		)
	}
}