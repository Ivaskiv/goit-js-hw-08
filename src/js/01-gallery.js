import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryElement = document.querySelector('.gallery');
galleryElement.insertAdjacentHTML('beforeend', createGallery(galleryItems));

function createGallery(img) {
  return img
    .map(({ preview, original, description }) => {
      return `
         
            <a class='gallery__link' href='${original}'>
              <img 
                class='gallery__image'
                src='${preview}'
                data-source='${original}'
                alt='${description}'
              />
            </a>
  
      `;
    })
    .join('');
}
const simpLightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captionPosition: 'bottom',
  overlayOpacity: 0.7,
});
