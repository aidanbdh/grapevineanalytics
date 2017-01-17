const analyticsEmail = 'aidanbdh1998@gmail.com';

window.addEventListener('load', function() {
  //Test: 'http://localhost:3000/data'
  fetch('https://grapevine-analytics.herokuapp.com/data', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      email: analyticsEmail,
      name: 'views'
    })
  })
    .catch(() => {
      console.log('Error sending analytics. Please contact grapevineanalytics for more details.');
    });
});
