const form = document.querySelectorAll('#create-profile input');
const firstName= form[0];
const lastName = form[1];
const username = form[2];
const password = form[3];
const confirmPassword= form[4];
const email = form[5];

function CreateProfile() {
  this.first_name = firstName.value;
  this.last_name = lastName.value;
  this.username = username.value;
  this.password = password.value;
  this.email = email.value;
};

document.getElementById('create-profile').addEventListener('submit' , () => {
  event.preventDefault();
  if(password.value !== confirmPassword.value) { window.alert('Your passwords did not match. Please try again'); return;}
  fetch('/new_profile', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(new CreateProfile())
  })
    .then(() => { window.alert('Profile Created!') })
    .catch(err => { window.alert('Error creating profile!')});
}, true);
