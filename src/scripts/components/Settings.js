import React from 'react';
import FontFamily from './settings/FontFamily.js';
import FontSize from './settings/FontSize.js';
import Difficulty from './settings/Difficulty.js';

export default class Settings extends React.Component{
	render(){
		return(
			<section className="settings">
				<FontFamily />
				<FontSize />
				<Difficulty />
			</section>
		)
	}
}