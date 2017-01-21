import React from 'react'
// import { connect } from 'react-redux';
import Map, { GoogleApiWrapper, Marker, InfoWindow, HeatMap } from 'google-maps-react';



class Places extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			selectedPlace: {

			}
		}	
	}
	onMarkerClick(){

	}
	onInfoWindowClose(){

	}
	render() {
		console.log('Places Component rendering with props:', this.props)
		const style = {
			width: '100vw',
			height: '100vh'
		}
		const initialCenter = {
			lat: 40.730610,
			lng: -73.935242
		}

		if(!this.props.loaded) {
			return <div>Loading...</div>
		}
		return (
			<Map google={this.props.google} zoom={16} initialCenter={initialCenter}>

			  <Marker onClick={this.onMarkerClick}
			          name={'Current location'}
			          position={initialCenter} />

			  <InfoWindow onClose={this.onInfoWindowClose}>
			      <div>
			        {/*<h1>{this.state.selectedPlace.name}</h1>*/}
			      </div>
			  </InfoWindow>
			</Map>
		)
	}
}
// const mapState = () => ({})
// const mapDispatch = {}
// export default connect(mapState, mapDispatch)(Places)

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCFTKsrh28Nwoh7gVLFt8GnFMnSST-hUgk',
  version: 3.25
})(Places)

