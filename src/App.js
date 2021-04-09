import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const SearchBar = () => (
  <form action="/" method="get">
      <br/>
      <input
          type="text"
          id="header-search"
          placeholder="Search News"
          name="keyword" 
      />
      <button type="submit">Search</button>
  </form>
);

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.callAPI();
  }
  
  componentDidUpdate(){
    const { search } = window.location;
    const query = new URLSearchParams(search).get('keyword');
    if(query && this.state.searchTerm !== query){
      this.setState({searchTerm: query})
      this.searchAPI(query)
    }
  }

  searchAPI(query){
    axios("/news/"+query)
    .then(res => {
      this.setState({ items: res.data.articles });
    })
    .catch(err => {
      this.setState({ error: "error Occured" });
    });
  }

	callAPI() {
		axios("/news")
			.then(res => {
				this.setState({ items: res.data.articles });
			})
			.catch(err => {
				this.setState({ error: "error Occured" });
			});
	}

	renderItem(item) {
    
		return (
			<li>
					<div class="card" onClick={()=>{window.location.href=item.url;}}>
						<div class="container">
							<h4>
								<b>{item.title}</b>
							</h4>
							<p>{item.publishedAt}</p>
						</div>
					</div>
			</li>
		);
	}

	renderContent() {
		let items = this.state.items;
		let itemsList;
		itemsList = items.map(item => this.renderItem(item));
		return itemsList;
	}

	render() {
		return this.state.items ? (
			<div>
        <SearchBar value={this.state.searchTerm}/>
				<ul class="list">{this.renderContent()}</ul>
			</div>
		) : null;
	}
}

export default App;
