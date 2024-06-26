/*
//-------------------------------------------
MMM-MyPrayerTimes
Copyright (C) 2019 - H. Tilburgs

v1.0 : Initial version
v2.0 : Update request to fetch (request package has been deprecated)

MIT License
//-------------------------------------------
*/

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({

  start: function() {
          console.log("Starting node_helper for: " + this.name);
  },

  //  don't need this anymore with async below
  getMPT: function(url) {
        // Make a GET request using the Fetch API
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');/// can't throw, no one to catch it
              // also, user doesn't get any feedback on error.. so screen looks stuck..
              // should send a different notification and put up an error message
            }
            return response.json();
          })

          .then(result => {
            // Process the retrieved user data
            // console.log(result.data.timings); // Remove trailing slashes to display data in Console for testing
            this.sendSocketNotification('MPT_RESULT', result.data.timings);
          })

          .catch(error => {
            console.error('Error:', error);
          });
  },

 socketNotificationReceived: function(notification, payload) {
            if (notification === 'GET_MPT') {
            this.getMPT(payload);
            }
  },


});
