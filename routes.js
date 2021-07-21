const routes = require('next-routes')();

routes.add('/give', 'give')
.add("/receive", "receive")


module.exports = routes;