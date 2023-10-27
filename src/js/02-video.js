//! 1. Ознайомся з документацією бібліотеки Vimeo плеєра.
//! 2. Додай бібліотеку як залежність проекту через npm.
//! 3. Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
//! 4. Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
//! 5. Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
//! 6. Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
//! 7. Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const iframe = document.getElementById('vimeo-player'); // отримати посилання на iframe відеоплеєра за його id 'vimeo-player'
const player = new Player(iframe); // створити новий об'єкт класу Player і передати в нього знайдений iframe
const onTimeupdate = throttle(function (data) {
  // console.log("duration:", data.duration); //властивість об'єкту data, яка містить тривалість відео
  // console.log("percent:", data.percent.toFixed(2) * 100 + "%"); //властивість об'єкту data, яка містить відсоток завершення відео
  // console.log("current:", data.seconds); //властивість об'єкту data, яка містить поточний час відтворення
  localStorage.setItem('videoplayer-current-time', data.seconds);
}, 1000); // така обробка події timeupdate дозволяє зберігати час відтворення відео з обмеженням - одне оновлення в секунду, що зменшує навантаження на браузер та локальне сховище
player.on('timeupdate', onTimeupdate); // обробник події timeupdate до плеєра
const savedTime = parseFloat(localStorage.getItem('videoplayer-current-time')); // отримати збережений час з локального сховища
player
  .setCurrentTime(savedTime)
  .then(function (seconds) {
    console.log(seconds);
    // виведення seconds у консоль у форматі 00:00:00
    console.log(
      `${Math.floor(seconds / 3600)
        .toString()
        .padStart(2, '0')}:${Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, '0')}:${Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0')}`
    );
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.error(
          'Помилка: час відтворення знаходиться поза допустимими межами'
        );
        break;
      default:
        console.error('Сталася невідома помилка');
        break;
    }
  });

//!ТЕОРІЯ
//! on ********************************
// on(event: string, callback: function): void
// Add an event listener for the specified event. Will call the callback with a single parameter, data, that contains the data for that event. See events below for details.

// const onPlay = function(data) {
//* data is an object containing properties specific to that event
// };
// player.on('play', onPlay);

//! timeupdate**************************
// Triggered as the currentTime of the video updates. It generally fires every 250ms, but it may vary depending on the browser.

// {
//     duration: 61.857
//     percent: 0.049
//     seconds: 3.034
// }

//! setCurrentTime *************************************
// setCurrentTime(seconds: number): Promise<number, (RangeError|Error)>
// Set the current playback position in seconds. Once playback has started, if the player was paused, it will remain paused. Likewise, if the player was playing, it will resume playing once the video has buffered. Setting the current time before playback has started will cause playback to start.

// You can provide an accurate time and the player will attempt to seek to as close to that time as possible. The exact time will be the fulfilled value of the promise.

// player.setCurrentTime(30.456).then(function(seconds) {
//* seconds = the actual time that the player seeked to
// }).catch(function(error) {
//     switch (error.name) {
//         case 'RangeError':
//* the time was less than 0 or greater than the video’s duration
//             break;

//         default:
//* some other error occurred
//             break;
//     }
// });

//! lodash.throttle ************************
//https://www.npmjs.com/package/lodash.throttle
//* Using npm:
// $ {sudo -H} npm i -g npm
// $ npm i --save lodash.throttle
//* In Node.js:
// var throttle = require('lodash.throttle');
