/**
 * @author Will Steinmetz
 * notific8 Javascript plug-in - build task
 * Copyright (c)2013-2018, Will Steinmetz
 * Licensed under the BSD license.
 * http://opensource.org/licenses/BSD-3-Clause
 */

module.exports = {
  release: {
    options: {
      pretty: true
    },
    files: {
      'index.html': 'src/pug/index.pug'
    }
  }
};
