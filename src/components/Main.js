import React from 'react';
import '../styles/Main.css'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// Main screen. Prompt the user to log in if they aren't/ the token has timed out.
// Fetch the event data for an awesome (wink wink) meetup and list it.
// This component is responsible only for the data relating to events.

class Main extends React.Component {
	constructor(){
		super();

		this.state = {
			dataFlag: false,
			data: [],
			token: ""
				
		}
	}

	componentDidMount(){
		if (!this.state.token){
			this.setState({token: this.props.token})
		}
	}

	promptLoginOrFetch(){
		if (this.state.dataFlag === true && this.state.token){
		}
		else if (this.state.dataFlag === false && this.state.token){
			fetch(`https://api.meetup.com/reactjs-dallas/events?access_token=${this.state.token}`)
				 .then(response => response.json())
    		.then(data => this.setState({ data, dataFlag: true }));
		}
		else if(typeof this.state.token === 'undefined'){		
			let url = `https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_OAUTH_KEY}&response_type=token&redirect_uri=https://b795f2da.ngrok.io`
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
	}

	populateList(){
		if (this.state.dataFlag === true){
			return(
				<div className='root'>
					<Grid container spacing={24} className="gridContainer" >{this.state.data.map((event, i) => {
							return(
								<Grid className="addPaddingLeftAndRight addPaddingToBottom" item xs={6} key={i}>
									<Paper className='paper'>	
										<h2>{event.name}</h2>
										<Button variant="outlined">
											<p className="indentation"><a className="link" href={event.link} target="_blank" rel="noopener noreferrer">Learn more about this event at Meetup.com</a></p>
										</Button>
										<p className="indentation">Date: {event.local_date}</p>
										<Divider variant="middle" />
										<div className="venue-div">
											<h3>RSVPs:</h3>
											<p className="indentation">RSVPs: {event.yes_rsvp_count}</p>
											<p className="indentation">Waitlist: {event.waitlist_count}</p>
											<Button variant="outlined">
												<Link className="link" to={{ pathname: '/rsvp', state: { token: this.state.token, eventId: event.id,  } }}>
													See current RSVPs for this event
												</Link>
											 </Button>
										</div>
										<br/>
										 <Divider variant="middle" />
										<div className="venue-div">
											<h3>Venue:</h3>
											<strong><p className="indentation">{event.venue.name}</p></strong>
											<p className="indentation">{event.venue.address_1}</p>
											<p className="indentation">{event.venue.address_2}</p>
											<p className="indentation">{event.venue.city}</p>
										</div>
									</Paper>
								</Grid>
							)
          })}</Grid>
				</div>
			)
		}
	}

	render(){
		return(	
			<div className="section">
				<h1 className="addPaddingLeftAndRight">ReactJS Dallas</h1>
				<Divider className="divider" />
				<br/>
				{ this.promptLoginOrFetch() }
				{ this.populateList() }
			</div>
		)
	}
}
export default Main;