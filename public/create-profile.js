const form = document.querySelectorAll('#create-profile input');
const firstName= form[0];
const lastName = form[1];
const email = form[2];

function CreateProfile() {
  this.first_name = firstName.value;
  this.last_name = lastName.value;
  this.email = email.value;
};

document.getElementById('create-profile').addEventListener('submit', () => {
  event.preventDefault();
  fetch('/new_profile', {
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
          switchView('create-profile', 'home');
          break;
        case 409:
          window.alert('That email is already in use. Please try again.');
          break;
        case 500:
          window.alert('Server Error.');
          break;
      };
    })
    .catch(err => { window.alert('Error creating profile!') });
}, true);
