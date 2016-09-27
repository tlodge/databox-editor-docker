module.exports = {
	secret: 'asdaksgdsahgdhsagd ahjsgdjhsg',
	
	github: {
		CLIENT_ID: '7d99912ceb0440fb4eeb',
    	        CLIENT_SECRET: '073439e3a1d6647435a59607732168bdb1f62cb6',
		CALLBACK: "http://databox.upintheclouds.org/auth/github/callback",
		API: "https://api.github.com",
		RAW_URL: "https://raw.githubusercontent.com",
		URL: "https://github.com",
	},
	
	appstore: {
		URL: 'http://store.upintheclouds.org'
	},
	
    mongo: {
    	url : 'mongodb://mongo/passport',
    },
    
    redis: {
   	 host: 'redis',
         port: 6379,
         pass: '5d94598b27227511fb9d6c4f20ab5f3cfaa58d6ed0127227a1268621ba70398e',
    }
}
