const loginEmail = document.getElementById('login-email');

function Login(){
  this.email = loginEmail.value;
  this.view = view;
}

document.getElementById('login').addEventListener('submit', () => {
  event.preventDefault();
  fetch('/account', {
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
          switchView('home');
          break;
      };
    })
    .catch(err => { window.alert('Error logging in') })
}, true);

const form = document.querySelectorAll('#create-profile input');
const firstName= form[0];
const lastName = form[1];
const email = form[2];

function CreateProfile() {
  this.first_name = firstName.value;
  this.last_name = lastName.value;
  this.email = email.value;
  this.view = view;
};

document.getElementById('create-profile').addEventListener('submit', () => {
  event.preventDefault();
  fetch('/account', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(new CreateProfile())
  })
    .then((res) => {
      switch(res.status) {
        case 201:
          window.alert('Profile Created!');
          res.json()
            .then(res => { helloMessage.textContent = `Hi ${res.first_name} ${res.last_name}!`; });
          switchView('home');
          break;
        case 409:
          window.alert('That email is already in use. Please try again.');
          break;
        case 500:
          window.alert('The server is offline. Please try again later.');
          break;
        default:
          console.log('Unsupported Status Code.');
          break;
      };
    })
    .catch(err => { window.alert('Error creating profile!') });
}, true);
