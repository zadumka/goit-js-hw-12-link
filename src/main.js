import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import getImgs from'./js/pixabay-api'
import { render, lightbox, loadMoreBtn} from './js/render-functions'
import errorIcon from '../src/img/error.png'; 

const searchForm = document.querySelector('.form');
const searchText = document.querySelector('[name=search-text]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.classList.remove("loader");

searchForm.addEventListener('submit', async (evt)=>{
    evt.preventDefault();
    gallery.innerHTML =""; 
    loader.classList.toggle("loader");
    loadMoreBtn.dataset.visible = "false";

 
 //                 -- por si no han teclado request --
 if (searchText.value.trim().length === 0) {
    loader.classList.remove("loader");
    iziToast.show({
        title: 'Error',
        message: 'Please enter your request',
        color: '#EF4040',
        titleColor: '#FFFFFF',
        titleSize: '16px',
        titleLineHeight: '24px',
        messageColor: '#FFFFFF',
        messageSize: '16px',
        messageLineHeight: '24px',
        iconUrl: errorIcon,
        iconColor: '#FFFFFF',
        theme: 'dark',
        position: 'topRight', 
    });
return
 }
//
//                       -- buscamos --
page = 1;

try {
    const { hits, totalHits } = await getImgs(searchText.value, page);
    loader.classList.remove("loader");
        if (hits.length === 0) {
        iziToast.show({
        title: '😢',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        color: '#EF4040',
        titleColor: '#FFFFFF',
        titleSize: '16px',
        titleLineHeight: '24px',
        messageColor: '#FFFFFF',
        messageSize: '16px',
        messageLineHeight: '24px',
        iconUrl: errorIcon,
        iconColor: '#FFFFFF',
        theme: 'dark',
        position: 'topRight', 
        })
        return
    }
    render({ hits, totalHits });
    lightbox.refresh();
} catch (error) {
    loader.classList.remove("loader");
    iziToast.show({
        title: '😢',
        message: error.message,
        color: '#EF4040',
        titleColor: '#FFFFFF',
        titleSize: '16px',
        titleLineHeight: '24px',
        messageColor: '#FFFFFF',
        messageSize: '16px',
        messageLineHeight: '24px',
        iconUrl: errorIcon,
        iconColor: '#FFFFFF',
        theme: 'dark',
        position: 'topRight',  
        }); 

}  

})
let page = 1;

loadMoreBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    page++;
   
try {
    const { hits, totalHits } = await getImgs(searchText.value, page);
    loader.classList.remove("loader");
        if (hits.length === 0) {
        iziToast.show({
        title: '😢',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        color: '#EF4040',
        titleColor: '#FFFFFF',
        titleSize: '16px',
        titleLineHeight: '24px',
        messageColor: '#FFFFFF',
        messageSize: '16px',
        messageLineHeight: '24px',
        iconUrl: errorIcon,
        iconColor: '#FFFFFF',
        theme: 'dark',
        position: 'topRight', 
        })
  
        return
        
    }
    await render({ hits, totalHits });

  
    lightbox.refresh();
    const galleryItem = document.querySelector('.gallery-item');
    const coord = galleryItem.getBoundingClientRect()
    // console.log(coord);
window.scrollBy({
    top: -coord.y*2,
   behavior: "smooth",
  });
} catch (error) {
    loader.classList.remove("loader");
    iziToast.show({
        title: '😢',
        message: error.message,
        color: '#EF4040',
        titleColor: '#FFFFFF',
        titleSize: '16px',
        titleLineHeight: '24px',
        messageColor: '#FFFFFF',
        messageSize: '16px',
        messageLineHeight: '24px',
        iconUrl: errorIcon,
        iconColor: '#FFFFFF',
        theme: 'dark',
        position: 'topRight',  
        }); 
        // console.log(error);
        

}  
})
