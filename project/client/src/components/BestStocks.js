import React from 'react';
import PageNavbar from './PageNavbar';
import BestStockRow from './BestStockRow';
import '../style/BestStocks.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestStocks extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedType: "",
			selectedPrice: "",
			stocks: []
		};

		this.submitChange = this.submitChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
	}

	handleTypeChange(e) {
		this.setState({
			selectedType: e.target.value
		});
	}

	handlePriceChange(e) {
		this.setState({
			selectedPrice: e.target.value
		});
	}

	submitChange() {
		// Send an HTTP request to the server.
		fetch(`http://localhost:8081/beststocks/${this.state.selectedType}-${this.state.selectedPrice}`,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(bestList => {
				if (!bestList) return;
				let bestDivs = bestList.map((bestStock, i) =>
					<BestStockRow key={i} bestStock={bestStock}></BestStockRow>
				);
				// Set the state of the stocks list to the value returned by the HTTP response from the server.
				this.setState({
					stocks: bestDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
	} 

	render() {

		return (
			<div className="BestStocks">
				<PageNavbar active="beststocks" />

				<div className="container beststocks-container">
			      <div className="jumbotron">
			        <div className="h5">Best Stocks</div>

			        <div className="select-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedType} onChange={this.handleTypeChange} className="dropdown" id="stocksDropdown">
			            	<option selected disabled value=''>Type</option>
			            	<option value="risk-taking">risk-taking</option>
			            	<option value="stable-seeking">stable-seeking</option>
			            </select>
			            <select value={this.state.selectedPrice} onChange={this.handlePriceChange} className="dropdown" id="stocksDropdown">
			            	<option selected disabled value=''>Price</option>
			            	<option value="less">&lt; 50</option>
			            	<option value="between">50 - 100</option>
			            	<option value="more">&gt; 100</option>
			            </select>

			            <button className="submit-btn" class="btn btn-outline-dark btn-sm" id="changeSubmitBtn" onClick={this.submitChange}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="stocks-container">
			          <div className="stock">
			            <div className="header"><strong>Ticker</strong></div>
			    		<div className="header"><strong>Stock Name</strong></div>
					    <div className="header"><strong>Sector</strong></div>
					    <div className="header"><strong>Open Price</strong></div>
					    <div className="header"><strong>High Price</strong></div>
			          </div>
			          <div className="stocks-container" id="results">
			            {this.state.stocks}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}