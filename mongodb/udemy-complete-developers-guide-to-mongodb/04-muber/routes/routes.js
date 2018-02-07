const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {

  // GET http://localhost:3050/api
  app.get('/api', DriversController.greeting);

};