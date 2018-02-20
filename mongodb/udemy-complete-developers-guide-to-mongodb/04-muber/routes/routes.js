const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {

  // GET http://localhost:3050/api
  app.get('/api', DriversController.greeting);

  // POST http://localhost:3050/api/drivers
  app.post('/api/drivers', DriversController.create);

  // PUT http://localhost:3050/api/drivers/xyz
  // the :id is really a wildcard where any value will be passed as an 'id' value
  // it will be accessible from req.params.id
  // we can specify multiple properties eg. /api/drivers/:id/:anotherProp
  app.put('/api/drivers/:id', DriversController.edit)

};