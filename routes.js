const routes = require('next-routes')();

routes.add('/give', 'give')
.add("/receive", "receive")
.add("/faq", "faq")


module.exports = routes;