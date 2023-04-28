module.exports = {
	apps: [
		{
			name: 'pokerquiz',
			script: './app/build/index.js',
			env: {
				PORT: 3000,
				ORIGIN: '',
			},
		},
		{
			name: 'pokerquiz-io',
			script: './server/build/index.js',
			env: {
				PORT: 3001,
				ADMIN_PASSWORD: '',
				JWT_SECRET: '',
			},
		},
	],
};
