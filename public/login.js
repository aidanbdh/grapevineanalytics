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
          res.json()
            .then(res => {
              helloMessage.textContent = `Hi ${res.first_name} ${res.last_name}!`;
              let rememberMe = confirm('Would you like to stay logged in?');
              if(rememberMe) {
                localStorage.setItem('email', res.email)
              };
            });
          switchView('login', 'home');
          break;
      };
    })
    .catch(err => { window.alert('Error logging in') })
}, true);
