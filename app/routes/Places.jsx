'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Gmap from '../components/Gmap';
import {removeFavorite, addFavorite} from '../reducers/favorites';
import {fetchNearByBreweries} from '../reducers/brewery';

const Places = (props)=>{
  const {breweries} = props;
  return (
    <div>
      <Gmap {...props} />
    </div>
    )
}

const mapState = ({breweries, auth})=>({breweries, auth})
const mapDispatch = {removeFavorite, addFavorite, fetchNearByBreweries}

export default connect(mapState, mapDispatch)(Places)
