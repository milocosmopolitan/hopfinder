'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Gmap from '../components/Gmap';

const Places = (props)=>{
  const {breweries} = props;
  return (
    <div>
      <Gmap {...props} />
    </div>
    )
}

const mapState = ({breweries})=>({breweries})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(Places)
