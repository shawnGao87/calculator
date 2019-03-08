import React, { Component, Fragment } from "react";

export default class Button extends Component {
	handleClick = e => {
		this.props.handleClick(e, this.props.name);
	};
	render() {
		return (
			<Fragment>
				<button id={this.props.id} onClick={this.handleClick}>
					{" "}
					{this.props.name}{" "}
				</button>
			</Fragment>
		);
	}
}
