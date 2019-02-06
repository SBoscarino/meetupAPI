import React from 'react';
import queryString from 'query-string';
import '../styles/Home.css'
import Main from "./Main.js";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// Initial screen. Prompt the user to log in so we can show content in Main.
class Home extends React.Component {
	constructor(){
		super();

		this.state = {
				data: [],
				token: ""
		}
	}

	componentDidMount(){
		const accessToken = queryString.parse(this.props.location.hash).access_token
		this.setState({ token: accessToken })
	}

	promptLogin(){
		let url = `https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_OAUTH_KEY}&response_type=token&redirect_uri=https://meetup-api-boscarino.herokuapp.com/`
		if(typeof this.state.token === 'undefined'){
			return (
				<div>
					<Paper className="paper">
						<h1>Hello. Please login to continue.</h1>
						<Button variant="outlined">
							<a className="link" href={url}>Login</a>
						</Button>
					</Paper>
				</div>
			)
		}
		else if(this.state.token){
			return ( <Main token={this.state.token}/> )
		}
	}

	render(){
		return(	
			<div className="section">
				{this.promptLogin()}
			</div>
		)
	}
}
export default Home;