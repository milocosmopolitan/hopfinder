import React from 'react'
import { connect } from 'react-redux';
import Map, { GoogleApiWrapper, Marker, InfoWindow, HeatMap } from 'google-maps-react';
import Contents from './Autocomplete'
import { Link } from 'react-router'



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
		console.log('Places Component rendering with props:', this.props)
    console.log('Places Component rendering with state:', this.state)
    const style = {
			width: '100vw',
			height: '100vh'
		}
		const initialCenter = {
			lat: 40.730500,
			lng: -73.935241
		}

		if(!this.props.loaded) {
			return <div>Loading...</div>
		}
    //const {breweries} = this.props
    const {activeMarker, showingInfoWindow, selectedPlace} = this.state;
    // console.log(breweries)
		return (
      <div id="map-wrapper">   
        <Map google={this.props.google}
             style={{width: '100%', height: '90%', position: 'relative'}}
             className={'map'}
             zoom={16}
             containerStyle={{}}
             centerAroundCurrentLocation={true}
             initialCenter={initialCenter}
             onClick={this.onMapClicked}             
             visible={true}>        
                 

          {
            this.props.breweries.length ? 
            this.props.breweries.map(brewery => (
              // console.log(brewery.brewery.website)
              <Marker key={brewery.breweryId} 
                      onClick={this.onMarkerClick}
                      position={{lat: brewery.latitude, lng: brewery.longitude}}
                      {...brewery} />
              )) : null
          }

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={this.onInfoWindowClose}>
              { selectedPlace && selectedPlace.brewery ? 
                ( 
                  <div id="info-wrapper">
                    <h4>{selectedPlace.brewery.name}</h4>
                    <h6>{selectedPlace.streetAddress}</h6>
                    <Link to={selectedPlace.brewery.website}>{selectedPlace.brewery.website}</Link>
                    <div onClick={this.addToFavorites}>Add to Favorites</div>
                    <a href="/">Add to Favoritesaaa</a>
                  </div>
                ) : <div>No info for you</div>
              }              
          </InfoWindow>
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

