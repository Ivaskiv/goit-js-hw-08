//! Завдання 3 - форма зворотного зв'язку
//! 1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
//! 2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
//! 3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
//! 4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
import throttle from 'lodash/throttle';

const FORM_ID = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');
const { email, message } = feedbackForm.elements;

// отримвти дані з локального сховища або створити порожній об'єкт
let feedbackData = JSON.parse(localStorage.getItem(FORM_ID)) || {};

// відновлення даних на сторінці після завантаження
reloadPage();

window.addEventListener('load', () => {
  // отримуємо дані з локального сховища при завантаженні сторінки
  const localStorageData = JSON.parse(localStorage.getItem(FORM_ID)) || {};
  // якщо дані є, то записуємо їх у поле форми
  localStorageData.email && (email.value = localStorageData.email);
  localStorageData.message && (message.value = localStorageData.message);
});

feedbackForm.addEventListener('input', throttle(onInputData, 500));
feedbackForm.addEventListener('submit', onFormSubmit);
function onInputData() {
  // якщо поля email або message заповнені, оновити об'єкт feedbackData
  if (email.value || message.value) {
    feedbackData = {
      email: email.value,
      message: message.value,
    };
    // та зберегти об'єкт feedbackData в локальному сховищі
    localStorage.setItem(FORM_ID, JSON.stringify(feedbackData));
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  console.log(feedbackData);
  if (!email.value || !message.value) {
    alert('Будь ласка 🙂, заповніть 🔤 всі поля форми ');
  } else {
    // Видалити дані з локального сховища
    localStorage.removeItem(FORM_ID);
    // Очистити поля форми
    email.value = '';
    message.value = '';
    // Оновити об'єкт feedbackData
    feedbackData = {};
  }
}
function reloadPage() {
  if (feedbackData) {
    email.value = feedbackData.email || '';
    message.value = feedbackData.message || '';
  }
}

//!ТЕОРІЯ
// JSON.stringify() перетворення обєкта в рядок
// const obj = {name: "John", age: 30, city: "New York"};
// const myJSON = JSON.stringify(obj);
// JSON.parse(), щоб перетворити текст на об`єкт JavaScript
//localStorage - це об'єкт веб-сховища в браузері, який дозволяє зберігати дані локально на комп'ютері користувача
//властивість localStorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
