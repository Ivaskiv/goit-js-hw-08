//! Завдання 3 - форма зворотного зв'язку
//! 1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
//! 2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
//! 3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
//! 4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
import throttle from 'lodash/throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector("input[name='email']");
const messageTextarea = feedbackForm.querySelector("textarea[name='message']");

const FORM_ID = 'feedback-form-state'; 
//функція для завантаження даних з локального сховища
const loadFromLocalStorage = () => {
  const savedDate = JSON.parse(localStorage.getItem(FORM_ID)) || {};
  emailInput.value = savedDate.email || '';
  messageTextarea.value = savedDate.message || '';
};

feedbackForm.addEventListener(
  'input',
  throttle(() => {
    // Збереження даних у локальному сховищі при кожній зміні
    if (emailInput.value || messageTextarea.value){
      const feedbackData = {
        email: emailInput.value,
        message: messageTextarea.value,
      };
      localStorage.setItem(FORM_ID, JSON.stringify(feedbackData));
    }
  }, 500)
);
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  //перевіряємо, чи поля заповнені перед відправкою
  if (!emailInput.value || !messageTextarea.value) {
    alert('Будь ласка 🙂, заповніть 🔤 всі поля форми ');
    return;
  }
  const feedbackData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(feedbackData);
  //очистити дані у локальному сховищі після відправки
  localStorage.removeItem(FORM_ID);
  //очистити поля форми
  emailInput.value = messageTextarea.value = '';
});

//!ТЕОРІЯ
// JSON.stringify() перетворення обєкта в рядок
// const obj = {name: "John", age: 30, city: "New York"};
// const myJSON = JSON.stringify(obj);
// JSON.parse(), щоб перетворити текст на об’єкт JavaScript
//localStorage - це об'єкт веб-сховища в браузері, який дозволяє зберігати дані локально на комп'ютері користувача
//властивість localStorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
