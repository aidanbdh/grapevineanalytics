const loginEmail = document.getElementById('login-email');

function Login(){
  this.email = loginEmail.value;
}

document.getElementById('login').addEventListener('submit', () => {
  event.preventDefault();
  fetch('/login', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(new Login())
  })
    .then(res => {
      switch(res.status) {
        case 409:
          window.alert('Your email did not match any profiles. Please try again or create a new profile.');
          break;
        case 200:
          switchView('login', 'create-profile');
          break;
      };
    })
    .catch(err => { window.alert('Error logging in') })
}, true);
