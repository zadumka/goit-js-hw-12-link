import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api'

let lightbox = new Simplelightbox('.gallery a')
const list = document.querySelector('.gallery')
const form = document.querySelector('.form')
import { clearGallery, createGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, loadBtn, list } from './js/render-functions'


let page = 1; 
let currentQuery = ''; 
let totalHits = 0; 




form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const query = event.currentTarget.elements["search-text"].value.trim()
    // console.log(query);

    if (!query) {
        iziToast.warning({
            message: 'Please enter a search term!'
        })
        return
    }
    currentQuery = query; 
   

    clearGallery();
    showLoader();
    hideLoadMoreButton()

    try {
        const res = await getImagesByQuery(currentQuery, page);
        // console.log(res);
        totalHits = res.totalHits; 
        // console.log(totalHits);


        if (res.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            })
        } else {
            list.insertAdjacentHTML('beforeend', createGallery(res.hits))
            lightbox.refresh(); 

            if (res.hits.length < totalHits) {
                showLoadMoreButton()
            } else {
                hideLoadMoreButton();
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight'
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        iziToast.error({
            message: 'Something went wrong. Please try again!',
            position: 'topRight'
        });
    } finally {
        hideLoader();
    }
})





loadBtn.addEventListener('click', handleLoadMore);
async function handleLoadMore() {
   
    page++;
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, page); 

        
        
        list.insertAdjacentHTML('beforeend', createGallery(data.hits));
        lightbox.refresh(); 
        

        const { height: cardHeight } = list.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

    } catch (error) {
        console.log(error.message);
        iziToast.error({
            message: 'Failed to load more images. Please try again!',
            position: 'topRight'
        });
    } finally {
        hideLoader(); 
 
    }
}
