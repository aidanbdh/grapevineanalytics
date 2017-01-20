let view = 'landing';
let user = '';

function switchView(newView) {
  document.getElementById('container-' + view).style.display = 'none';
  document.getElementById('container-' + newView).style.display = 'block';
  view = newView;
};

const $start = document.getElementById('start');

$start.addEventListener('click', () => {
  switchView('create-profile');
});


const $alreadyUser = document.getElementById('already-user');

$alreadyUser.addEventListener('click', () => {
  switchView('login');
});

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
          views.textContent = `Total Views: ${res.data.length + 1}`
          graph(res.data, 'views', 0);
          switchView('home');
          user = res.profile.email;
        });
    });
}

let viewDay = 0;

const $charts = document.getElementById('charts');

const $next = document.getElementById('next');

$next.addEventListener('click', () => {
  $charts.innerHTML = "";
  fetch('/find', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ email: user })
  })
    .then(res => {
      res.json()
        .then(res => {
          graph(res.data, 'views', 1);
        });
    });
});

const $previous = document.getElementById('previous');

$previous.addEventListener('click', () => {
  $charts.innerHTML = "";
  fetch('/find', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ email: user })
  })
    .then(res => {
      res.json()
        .then(res => {
          graph(res.data, 'views', -1);
        });
    });
});
