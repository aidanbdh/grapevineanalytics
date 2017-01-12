const loginForm = document.querySelectorAll('#login div label input');
const loginUsername = loginForm[0];
const loginPassword = loginForm[1];

function Login(){
  this.username = loginUsername.value;
  this.password = loginPassword.value;
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
          window.alert('Your username or password was incorrect. Please try again');
          break;
        case 200:
          switchView('login', 'create-profile');
          break;
      };
    })
    .catch(err => { window.alert('Error logging in') })
}, true);
