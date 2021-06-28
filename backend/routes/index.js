const usersRouter = require('./Users');
const topicRouter = require('./Topics');
const writingRouter = require('./Writings');

const getRouter = (path, controller) => ({ path, controller });

const routes = [
  getRouter('/api/users', usersRouter),
  getRouter('/api/topic', topicRouter),
  getRouter('/api/writing', writingRouter),
  getRouter('/api/*', (req, res) =>
    res.status(400).send({ result: false, message: 'Invalid Request' })
  )
];

module.exports = routes;
