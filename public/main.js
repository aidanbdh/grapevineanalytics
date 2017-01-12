function switchView(view1, view2) {
  document.getElementById('container-' + view1).style.display = 'none';
  document.getElementById('container-' + view2).style.display = 'block';
};

const createAccount = document.getElementById('create-account');

createAccount.addEventListener('click', () => {
  switchView('login', 'create-profile');
});
