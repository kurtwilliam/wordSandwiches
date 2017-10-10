import React from 'react';
import FontFamily from './settings/FontFamily.js';
import FontSize from './settings/FontSize.js';
import Difficulty from './settings/Difficulty.js';

export default class Settings extends React.Component{
	constructor(props) {
		super(props);
		this.state = ({ wordLength: '>2,<5' });
		this.myCallBack = this.myCallBack.bind(this);
	}
	myCallBack(dataFromDifficulty) {
		// Pass wordLength for API call to Parent App in order to pass it back down to child, Magic
		console.log(dataFromDifficulty)
	   this.setState({ wordLength: dataFromDifficulty });
	   this.props.callBackFromParent(this.state.wordLength);	
	}
	render(){
		return(
			<section className="settings">
				<FontFamily />
				<FontSize />
				<Difficulty callBackFromParent={this.myCallBack} wordLength={this.state.wordLength} />
			</section>
		)
	}
}