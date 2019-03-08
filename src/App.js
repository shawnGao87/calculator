import React, { Component } from "react";
import "./App.css";
import Button from "./Button";
import Display from "./Display";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayNumber: "0",
			numbers: [
				{
					number: 0,
					id: "zero"
				},
				{
					number: 1,
					id: "one"
				},
				{
					number: 2,
					id: "two"
				},
				{
					number: 3,
					id: "three"
				},
				{
					number: 4,
					id: "four"
				},
				{
					number: 5,
					id: "five"
				},
				{
					number: 6,
					id: "six"
				},
				{
					number: 7,
					id: "seven"
				},
				{
					number: 8,
					id: "eight"
				},
				{
					number: 9,
					id: "nine"
				}
			],
			operators: [
				{
					operation: "C",
					id: "clear"
				},
				{
					operation: "+",
					id: "plus",
					basic: true
				},
				{
					operation: "-",
					id: "minus",
					basic: true
				},
				{
					operation: "*",
					id: "multiply",
					basic: true
				},
				{
					operation: "/",
					id: "divide",
					basic: true
				},
				{
					operation: "=",
					id: "equal"
				},
				{
					operation: ".",
					id: "dot"
				}
			],
			hasDot: false,
			hasOperator: false
		};
	}
	handleClick = (e, name) => {
		console.log(name);
		console.log(e.target.id);

		let displayNumber = this.state.displayNumber;
		let hasOperator = this.state.hasOperator;
		let hasDot = this.state.hasDot;

		const numbers = this.state.numbers.map(i => {
			return i.number;
		});
		const operators = this.state.operators
			.filter(i => {
				return i.basic === true;
			})
			.map(i => {
				return i.operation;
			});
		switch (true) {
			// if button is number
			case numbers.indexOf(name) >= 0:
				if (displayNumber === "0") {
					displayNumber = name.toString();
				} else {
					displayNumber += name;
				}
				hasOperator = false;
				break;

			case operators.indexOf(name) >= 0 && name !== "=" && name !== "C":
				if (!hasOperator) {
					displayNumber += name;
					hasOperator = true;
				} else {
					displayNumber =
						displayNumber.slice(0, displayNumber.length - 1) + name;
				}
				hasDot = false;
				break;

			case name === "C":
				displayNumber = "0";
				hasOperator = false;
				hasDot = false;
				break;

			case name === "." && !hasDot:
				displayNumber += name;
				hasDot = true;
				break;

			case name === "=":
				let result = eval(displayNumber);
				result.toString().indexOf(".") >= 0 && (hasDot = true);
				displayNumber = result;
				break;
			default:
		}

		this.setState({ displayNumber, hasDot, hasOperator });
	};

	render() {
		return (
			<div className="App">
				<Display displayNumber={this.state.displayNumber} />
				<div className="calArea">
					{this.state.numbers.map(i => {
						return (
							<Button
								id={i.id}
								key={i.id}
								name={i.number}
								handleClick={this.handleClick}
							/>
						);
					})}
					{this.state.operators.map(i => {
						return (
							<Button
								id={i.id}
								key={i.id}
								name={i.operation}
								handleClick={this.handleClick}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default App;
