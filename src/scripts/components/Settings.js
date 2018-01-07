import React from 'react';
import FontFamily from '../containers/settings/FontFamily.js';
import FontSize from '../containers/settings/FontSize.js';
import Difficulty from '../containers/settings/Difficulty.js';

export default class Settings extends React.Component{
	render(){
		return(
			<section className="settings">
				<FontFamily />
				<FontSize />
				<Difficulty onWordLengthChange={this.props.onWordLengthChange} length={this.props.length} />
			</section>
		)
	}
}