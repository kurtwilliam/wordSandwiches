import React from 'react';

export default class Difficulty extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}
	calculateMultiplier(){

	}
	frequency(){

	}
	length(){
		
	}
	render(){
		return(
			<div className="settings-difficulty">
				<h3>Difficulty</h3>
				<div className="settings-difficulty-length">
					<h4>Word Length</h4>
					<label htmlFor="wordLength">4 - 6 characters</label>
					<input type="range" name="wordLength" min="4" max="10" step="1" onChange={this.length} id="wordLengthInput" />
				</div>
				<div className="settings-difficulty-frequency">
					<h4>Word Use Frequency</h4>
					<button value="1">Common</button>
					<button value="2">UnCommon</button>
					<button value="3">Rare</button>
				</div>
				<div className="settings-multiplier">
					<h4>Your Score Multiplier:</h4>
					<p></p>
				</div>
			</div>
		)
	}
}