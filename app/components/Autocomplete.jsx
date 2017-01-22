import React from 'react';
import ReactDOM from 'react-dom'
// import Map, { GoogleApiWrapper, Markr, InfoWindow, HeatMap } from 'googl
 

class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      position: null
    }
  }
  // getInitialState() {
  //   return {
  //     place: null,
  //     position: null
  //   }
  // }

  // onSubmit(e) {
  //   e.preventDefault();
  //   const aref = this.refs.autocomplete;
  //   console.log(e.target)
  //   console.log('aref', aref)
  // }
 
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

    console.log('renderAutoComplete',this.props)
    if (!google || !map) return;

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace(),
            search = () => {
              var places = new google.maps.places.PlacesService(map)

              places.nearbySearch({
                bounds: map.getBounds(),
                types: ['bar', 'food', 'restaurant']
              },(results, status)=>{
                console.log('results',results)
              })
            };


      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
        //search function
      }
      search()

      this.setState({
        place: place,
        position: place.geometry.location
      })
    })
  }

  render() {
    const props = this.props;
    const {position} = this.state;

    return (
      
      <div className="autocomplete">        
        <input
            ref='autocomplete'
            type="text"
            placeholder="Enter a location" />      
      </div>
      
    )
  }
}


export default Contents