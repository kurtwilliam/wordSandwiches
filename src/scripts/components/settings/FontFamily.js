import React from 'react';

export default class FontFamily extends React.Component{
	constructor(){
		super();
		this.state = {
			fontFamily: 'Helvetica',
		}
	}
	changeFont(){
		// Make the state of fontFamily update to the value of the button that is pressed. 
	}
	render(){
		return(
			<div className="settings-fontFamily">
				<button>{}</button>
				<button></button>
				<button></button>
			</div>
		)
	}
}