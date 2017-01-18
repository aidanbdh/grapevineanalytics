let view = 'login';
let user = '';

function switchView(newView) {
  document.getElementById('container-' + view).style.display = 'none';
  document.getElementById('container-' + newView).style.display = 'block';
  view = newView;
};

const createAccount = document.getElementById('create-account');

createAccount.addEventListener('click', () => {
  switchView('create-profile');
});

const logout = document.getElementById('logout');

logout.addEventListener('click', () => {
  switchView('login');
  if(localStorage.getItem('email')) localStorage.removeItem('email');
});

const helloMessage = document.getElementById('hello-message');
const views = document.getElementById('views');

window.onload = function() {
  if(localStorage.getItem('email')) {
    fetch('/find', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ email: localStorage.getItem('email') })
    })
      .then(res => {
        res.json()
          .then(res => {
            helloMessage.textContent = `Hi ${res.profile.first_name} ${res.profile.last_name}!`
            console.log(res);
            views.textContent = `Views: ${res.views}`
            switchView('home');
            user = res.profile.email;
          });
      });
  }
}
