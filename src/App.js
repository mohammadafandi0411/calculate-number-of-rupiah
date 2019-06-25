import React from 'react';
import { render } from 'react-dom';
import './App.css';
import { parseFraction } from './FractionParser';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: "",
			result: [],
			status: 0,
		}
	}

	inputAmount(event) {
		this.setState({amount: event.target.value})
	}

	getFraction(event) {
		if (event.which === 13 && this.state.amount != '') {
			var fractionParser = parseFraction(this.state.amount);
			if (fractionParser.status === 'success') {
				this.setState({
				  status: 1,
				  result: fractionParser.data.countedFraction,
				  lastAmount: fractionParser.data.lastAmount
				});
			} else if (fractionParser.status === 'failed') {
				this.setState({
				  status: 2
				});
			}
		} else {
			this.setState({status: 0});
		}
	}
	
	componentWillMount() {
		document.addEventListener('keydown', this.getFraction.bind(this));
	}

  getResultView() {
    if (this.state.status === 1) {
		return (
			<div className="panel">
				<div className="row">

					{this.state.result.map((fraction, i) => {
					  return (
						<table className="table">
							<tr key={i}>
								<td className="total">{fraction.count} X </td>
								<td className="amount">Rp{fraction.amount}</td>
							</tr>
						</table>
					  );
					})}  

				</div>

				{this.state.lastAmount > 0 ? 
					<div className='alert-info'> 
						Rp {this.state.lastAmount} no available fraction 
					</div> 
				:''}
				
			</div>
		);
	  
    } else if (this.state.status === 2)
		return (
			<div className="invalid">
			  You enter the wrong input format, Examples of valid inputs with their canonical equivalents 18.215 (18215), Rp17500 (17500), Rp17.500,00 (17500), Rp 120.325 (120325), 005.000 (5000), 001000 (1000)
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				<div className="header">
					<h1>Calculate the minimum number of rupiahs </h1>
				</div>
				<div className="content">
					<input className="input-form" onChange={this.inputAmount.bind(this)} placeholder="Input your minimum number of rupiahs "/>
					{this.getResultView()}
				</div>
			</div>
		);
	}
}

export default App;
