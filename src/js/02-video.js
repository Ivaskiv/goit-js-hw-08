//! 1. Ознайомся з документацією бібліотеки Vimeo плеєра.
//! 2. Додай бібліотеку як залежність проекту через npm.
//! 3. Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
//! 4. Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
//! 5. Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
//! 6. Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
//! 7. Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

document.addEventListener('DOMContentLoaded', function () {
  const iframe = document.getElementById('vimeo-player');
  const player = new Player(iframe);
  const onTimeupdate = throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000);
  player.on('timeupdate', onTimeupdate);

  const savedTime_ID = localStorage.getItem('videoplayer-current-time');
  if (savedTime_ID !== null) {
    const savedTimeFloat = parseFloat(savedTime_ID);
    player
      .setCurrentTime(savedTimeFloat)
      .then(function (seconds) {
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
  }
});
