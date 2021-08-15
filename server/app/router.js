'use strict';


module.exports = app => {

  require('./router/doc')(app)
  require('./router/user')(app)
  require('./router/admin')(app)
};
