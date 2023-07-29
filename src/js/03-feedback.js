import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const emailInput = document.querySelector('input[name=email]');
const messageInput = document.querySelector('textarea[name=message]');

const STORAGE_KEY = 'feedback-form-state';

formfilling();

form.addEventListener('input', throttle(addlocalStorageInform, 500));
form.addEventListener('submit', onFormSubmit);

function addlocalStorageInform(event) {
  const formValues = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function formfilling() {
  const localStorageValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!localStorageValue) {
    return;
  }

  emailInput.value = localStorageValue.email;
  messageInput.value = localStorageValue.message;
}
