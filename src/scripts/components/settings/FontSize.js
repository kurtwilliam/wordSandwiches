import React from 'react';

export default class FontSize extends React.Component{
	constructor(){
		super();
		this.state = {
			fontSize: 4.2,
			fontSizeDisplay: 4.2,
		}
		this.changeFontSize = this.changeFontSize.bind(this);
	}
	changeFontSize(e) {
		// Get range input 
		let fontSizeInput = document.getElementById('fontSizeInput');

		// Set the font size state equal to the inputs value
		this.setState({
			fontSize: fontSizeInput.value,
			fontSizeDisplay: fontSizeInput.value*10,
		})

		// Set font size of game paragraph	
		let gameDivH2 = document.getElementById('gameDivH2');
		gameDivH2.style.fontSize = `${this.state.fontSize}rem`;

		let gameDivP = document.getElementById('gameDivP');
		gameDivP.style.fontSize = `${this.state.fontSize}rem`;
	}
	render(){
		return(
			<div className="settings-fontSize">
				<h3>Font Size</h3>
				<label htmlFor="fontSize">{this.state.fontSizeDisplay} px</label>
				<input type="range" name="fontSize" min="1.2" max="5" step="0.2" value={this.state.fontSize} onChange={this.changeFontSize} id="fontSizeInput" />
			</div>
		)
	}
}