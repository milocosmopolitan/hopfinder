'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import TweetEmbed from 'react-tweet-embed';
import InstagramEmbed from 'react-instagram-embed';

const tweets = ['822534725046771713', '823215006212902912', '798544956109586432', '821761864023547904', '821778798605639682', '823256735070744578', '821449984201658368', '822899750093684737', '822550575099289600', '823233450132066304', '822506541458673664', '822534725046771713']

const insta = ['https://www.instagram.com/p/BPab5RPAuOO/', 'https://www.instagram.com/p/BPfuiGnBFgr/', 'https://www.instagram.com/p/BPlioWmB1Re/', 'https://www.instagram.com/p/BPihV8Qgrwn/', 'https://www.instagram.com/p/BPdulMqgUtw', 'https://www.instagram.com/p/BPiL_ZfDgv0', 'https://www.instagram.com/p/BPito1Ejhwk', 'https://www.instagram.com/p/BPbA-ZrhkAw']

const News = (props)=>{
	return (
			<Grid id="news-wrapper" fluid={true}>
					<Col xs={12} md={6} mdOffSet={3}>
					{
						tweets.map(tweet => (
						<TweetEmbed key={`${tweet}`} id={`${tweet}`} />
						))
					}
					</Col>
					<Col xs={12} md={6} mdOffSet={3}>
					{
						insta.map(function(inst, i){
							return <InstagramEmbed key={i} url ={`${inst}`} maxWidth={500} />
						})
					}
				</Col>
		</Grid>
		)
}

const mapState = ({})=>({News})
const mapDispatch = ()=>({})

export default connect(mapState, mapDispatch)(News)
