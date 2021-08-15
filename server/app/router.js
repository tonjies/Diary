'use strict';


module.exports = app => {
  require('./router/doc')(app)
  require('./router/user')(app)
};
