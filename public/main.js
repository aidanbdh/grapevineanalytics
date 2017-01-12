function switchView(view1, view2) {
  document.getElementById('container-' + view1).style.display = 'none';
  document.getElementById('container-' + view2).style.display = 'block';
};

const createAccount = document.getElementById('create-account');

createAccount.addEventListener('click', () => {
  switchView('login', 'create-profile');
});

const logout = document.getElementById('logout');

logout.addEventListener('click', () => {
  switchView('home', 'login');
  if(localStorage.getItem('email')) localStorage.removeItem('email');
});

let user;
const helloMessage = document.getElementById('hello-message');

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
            user = res;
            helloMessage.textContent = `Hi ${res.first_name} ${res.last_name}!`
            switchView('login', 'home');
          });
      });
  }
}
