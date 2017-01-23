'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import TweetEmbed from 'react-tweet-embed';
import InstagramEmbed from 'react-instagram-embed';
import LazyLoad from 'react-lazyload'

const tweets = ['822534725046771713', '823215006212902912', '798544956109586432', '821761864023547904', '821778798605639682', '823256735070744578', '821449984201658368', '822899750093684737', '822550575099289600', '823233450132066304', '822506541458673664']

const insta = ['https://www.instagram.com/p/BPab5RPAuOO/', 'https://www.instagram.com/p/BPfuiGnBFgr/', 'https://www.instagram.com/p/BPlioWmB1Re/', 'https://www.instagram.com/p/BPihV8Qgrwn/', 'https://www.instagram.com/p/BPdulMqgUtw', 'https://www.instagram.com/p/BPiL_ZfDgv0', 'https://www.instagram.com/p/BPito1Ejhwk', 'https://www.instagram.com/p/BPbA-ZrhkAw']

const News = (props)=>{
	return (
			<Grid id="news-wrapper" fluid={true}>
				<Row>
					<Col xs={12} md={6}>
					{
						tweets.map(tweet => (
					<LazyLoad key={`${tweet}`} height={200}>
						<TweetEmbed id={`${tweet}`} options={{width:100+"%"}}/>
					</LazyLoad>
						))
					}

					</Col>
					<Col xs={12} md={6}>
					{
						insta.map(function(inst, i){
							return (
								<LazyLoad key={i} height={200}>
									<InstagramEmbed url ={`${inst}`} maxWidth={500} />
								</LazyLoad>
							)
						})
					}
				</Col>
			</Row>
		</Grid>
		)
}

const mapState = ({})=>({})
const mapDispatch = ()=>({})

// import Brewery from '../components/Brewery';

// const News = (props)=>{
// 	console.log('News props', props)
// 	const { favorites, location, params } = props;
// 	return (
// 		<Grid id="news-wrapper" fluid={true}>
// 			<Row>
// 				<Col 
// 					xs={12} 
// 					md={location.pathname === '/places' ? 12 : 6} 
// 					mdOffset={location.pathname === '/places' ? 0 : 3}>
// 				{ favorites ? favorites.map(favorite=>(
// 						<Brewery 
// 							key={favorite.brewery.breweryId}
// 							location={location}
// 							params={params}
// 							{...favorite.brewery} />
// 					)) : null
// 				}
// 				</Col>
// 			</Row>
// 		</Grid>
// 		);
// };

// const mapState = ({favorites})=>({favorites});
// const mapDispatch = {};


export default connect(mapState, mapDispatch)(News);
