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
              helloMessage.textContent = `Hi ${res.profile.first_name} ${res.profile.last_name}!`;
              views.textContent = `Total Views: ${res.data.length}`;
              graph(res.data, 'views', 0);
              user = res.profile.email;
              let rememberMe = confirm('Would you like to stay logged in?');
              if(rememberMe) {
                localStorage.setItem('email', res.profile.email);
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
const url = form[3];

function CreateProfile() {
  this.first_name = firstName.value;
  this.last_name = lastName.value;
  this.email = email.value;
  this.url = url.value;
};

document.getElementById('create-profile').addEventListener('submit', () => {
  event.preventDefault();
  fetch('/newAccount', {
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
            .then(res => {
              helloMessage.textContent = `Hi ${res.profile.first_name} ${res.profile.last_name}!`;
              user = res.profile.email;
            })
            views.textContent = `Views: 0`;
            graph([], 'views', 0)
            switchView('home')
          break;
        case 409:
          window.alert('That email or url is already in use. Please try again.');
          break;
        case 500:
          window.alert('The server is offline. Please try again later.');
          break;
        default:
          console.log('Unsupported Status Code.');
          break;
      }
}, true);
