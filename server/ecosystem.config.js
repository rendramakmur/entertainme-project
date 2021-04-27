module.exports = {
  apps: [
    {
       name: 'Client',
       script: 'cd client && npm install && npm start',
    },
    {
      name: 'Orchestrator',
      script: 'cd server/orchestrator && npm install && npm run dev',
    },
    {
      name: 'Service Movies',
      script: 'cd server/movies && npm install && npm run dev',
    },
    {
      name: 'Service TV Series',
      script: 'cd server/series && npm install && npm run dev'
    }
  ]
};