import React from 'react';
import '../styles/Rsvp.css'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// RSVP screen. If this screen is navigated to, we need to fetch the rsvp data for...
// ..the selected event and provide it.
// This component is responsible only for the data relating to rsvps based on the id of the event.

class Rsvp extends React.Component {
	constructor(){
		super();

		this.state = {
				rsvpData: [],
				dataFlag: false
		}
	}

	promptLoginOrFetchRsvps(){
		if (this.state.rsvpData.length === 0){
			fetch(`https://api.meetup.com/reactjs-dallas/events/${this.props.location.state.eventId}/rsvps?access_token=${this.props.location.state.token}`)
			.then(response => response.json())
			.then(rsvpData => this.setState({ rsvpData, dataFlag: true }));
		}
		else if (this.state.rsvpData.length && this.props.location.state.token){
			return
		}
		else if(typeof this.state.token === 'undefined'){		
			let url = `https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_OAUTH_KEY}&response_type=token&redirect_uri=https://f02baea3.ngrok.io`
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

	populateListOfRsvps(){
		if (this.state.dataFlag === true){
			return(
				<div className='root'>
					<Grid container spacing={24} className="gridContainer" >{this.state.rsvpData.map((rsvp, i) => {
							return(
								<Grid className="addPaddingLeftAndRight addPaddingToBottom" item xs={3} key={i}>
									<Paper className='paper'>	
										<h3 className="align sizing">{rsvp.member.name}</h3>
										{
											rsvp.member.photo 
												? (<img src={rsvp.member.photo.thumb_link} alt={rsvp.member.name}/>)
												: (<img src={rsvp.group.group_photo.thumb_link} alt={rsvp.member.name}/>)
										}
									</Paper>
								</Grid>
							)
          })}
					</Grid>
				</div>
			)
		}
	}

	render(){
		return(	
			<div className="section">
				<h1 className="addPaddingLeftAndRight">ReactJS Dallas RSVPs</h1>
				<Divider className="divider" />
				<br/>
				{ this.promptLoginOrFetchRsvps() }
				{ this.populateListOfRsvps() }
			</div>
		)
	}
}
export default Rsvp;