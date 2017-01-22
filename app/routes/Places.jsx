import React from 'react'
// import { connect } from 'react-redux';
import Map, { GoogleApiWrapper, Marker, InfoWindow, HeatMap } from 'google-maps-react';



class Places extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			// selectedPlace: {

			// }
		}
	}
	
	getInitialState () {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      place: null,
      position: null
    }
  }
	onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  renderAutoComplete() {
    const {google, map} = this.props;

    if (!google || !map) return;

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({
        place: place,
        position: place.geometry.location
      })
    })
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
		return (
      <div className={flexWrapper}>
        <div className={left}>
          <form onSubmit={this.onSubmit}>
            <input
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              className={button}
              type='submit'
              value='Go' />
          </form>
          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
        </div>
        <div className={styles.right}>
			<Map google={this.props.google}
	         style={{width: '100%', height: '100%', position: 'relative'}}
	         className={'map'}
	         zoom={16}
	         containerStyle={{}}
	         centerAroundCurrentLocation={true}
           initialCenter={this.state.currentLocation}
	         onClick={this.onMapClicked}
	         onDragend={this.onMapMoved}
           visible={false}>
          <Contents {...this.props} />

			  <Marker onClick={this.onMarkerClick}
			          name={'Current location'}
			          position={initialCenter} />

			  <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
			</Map>
		)
	}
}

// const mapState = () => ({})
// const mapDispatch = {}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyCFTKsrh28Nwoh7gVLFt8GnFMnSST-hUgk',
  version: 3.25
})(Places)

