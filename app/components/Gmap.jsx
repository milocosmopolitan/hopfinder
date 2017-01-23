import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import Map, { GoogleApiWrapper, Marker, InfoWindow, HeatMap } from 'google-maps-react';
import PlaceInfo from './PlaceInfo';
import Contents from './Autocomplete';
import { Link } from 'react-router';
import Breweries from '../routes/Breweries'


class Gmap extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onMapClicked = this.onMapClicked.bind(this)
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this)
    this.addToFavorites = this.addToFavorites.bind(this)
	}

  addInfoWindowEvents(){
    ReactDOM.findDOMNode(this).addEventListener('nv-enter', this.addToFavorites);
  }

  addToFavorites(e){
    // console.log(e.target)
    // this.state.selectedPlace
    let favorite = {
      brewery_id: this.state.selectedPlace.breweryId,
      user_id: this.state.auth.id
    }
    
    console.log('addToFavorites', favorite)
    this.props.addFavorite(favorite, this.state.selectedPlace)
  }

	onMarkerClick (props, marker, e) {    
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    // this.addInfoWindowEvents()
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

	render() {
		console.log('Gmap Component rendering with props, state:', this.props, this.state)
    
		const initialCenter = {
			lat: 40.730500,
			lng: -73.935241
		}

		if(!this.props.loaded) {
			return <div>Loading...</div>
		}
    //const {breweries} = this.props
    const { activeMarker, showingInfoWindow, selectedPlace } = this.state,
          { google, breweries, location } = this.props;
    // console.log(breweries)


		return (
      <div id="map-wrapper">   
        <Map google={google}
             style={{width: '100%', height: '90%', position: 'relative'}}
             className={'map'}
             zoom={16}
             containerStyle={{}}
             centerAroundCurrentLocation={true}
             initialCenter={initialCenter}
             onClick={this.onMapClicked}             
             visible={true}>        
                 

          {
            breweries.length ? 
            breweries.map(brewery => (
              // console.log(brewery.brewery.website)
              <Marker key={brewery.breweryId} 
                      onClick={this.onMarkerClick}
                      position={{lat: brewery.latitude, lng: brewery.longitude}}
                      {...brewery} />
              )) : null
          }

          <InfoWindow
            id="info-wrapper"
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={this.onInfoWindowClose}>
              { 
                selectedPlace && selectedPlace.brewery 
                ? <PlaceInfo selectedPlace={selectedPlace} /> 
                : <div>No info for you</div>
              }              
          </InfoWindow>
          <Breweries {...this.props} />
          <Contents {...this.props} />
        </Map>      
        
    </div>
		)
	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCFTKsrh28Nwoh7gVLFt8GnFMnSST-hUgk',
  version: 3.25,
  libraries: ['places', 'visualizations']
})(Gmap)

