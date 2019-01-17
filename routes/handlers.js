// Handler functions

fs = require('fs');

module.exports = {
    /** Handles errors from Mongoose. */
    mongo_error: function(err) {
        console.log('MongoDB encountered an error: ', JSON.stringify(err, undefined, 2));
        fs.appendFile('error-log.txt', JSON.stringify(err), function(err) {
            if (err) {
                throw err;
            }
        })
    },
}

