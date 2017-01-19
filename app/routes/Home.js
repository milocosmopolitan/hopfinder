import React from 'react'
const Home = ()=>{
	return (
		<div>
			<p>THIS IS HOME PAGE ROUTE COMPONENT</p>
		</div>
		)
}

const mapState = {}
const mapDispatch = {}

export default connect(mapStat, mapDispatch)(Home)
