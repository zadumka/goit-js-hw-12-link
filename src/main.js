import { getImagesByQuery } from './js/pixabay-api';More actions
import {
  createGallery,
  hideLoader,
  showLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form'),
  loadMore = document.querySelector('.load-button'),
  input = document.querySelector('.input');


let currentPage = 1;
let userQuery = '';
let hits = 0;

hideLoadMoreButton();

form.addEventListener('submit', async event => {
  currentPage = 1;
  hits = 0;
  userQuery = input.value.trim();
  event.preventDefault();
  button.disabled = true;

  if (userQuery === '') {
    iziToast.error({
      message: 'Please, fill in the field',
      color: '#ef4040',
      messageColor: '#fff',
      position: 'topRight',
    });
    return;
  }
  

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(userQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: '#ef4040',
        messageColor: '#fff',
        position: 'topRight',
      });
      return;
    }


    hits += data.hits.length;
    createGallery(data.hits);

    if (hits >= data.totalHits) {
      hideLoadMoreButton();
    }

    showLoadMoreButton();
  } catch (error) {
    iziToast.error({
      message: `${error}`,
    });
  } finally {
    hideLoader();
  }
});

loadMore.addEventListener('click', handleClick);

async function handleClick() {

  currentPage += 1;


  try {
    const data = await getImagesByQuery(userQuery, currentPage);

    createGallery(data.hits);

 

    hits += data.hits.length;
  

    if (hits >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: `${error}`,
    });
  } finally {
    hideLoader();
  }
}
