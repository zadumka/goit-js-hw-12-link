import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const gallery = document.querySelector('.gallery');
export const loadMoreBtn = document.querySelector('.loadMore-btn');
import errorIcon from '../img/error.png'; 


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: "alt",
  captionDelay: 250,
});
const render =  hits =>{
  
  const imgCollection = [];

    hits.forEach(image => {
        const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image;
        
        return  imgCollection.push( `<li class="gallery-item">
         <a class="gallery-link" href="${largeImageURL}">
           <img
             class="gallery-image"
             src="${webformatURL}"
             alt="${tags}"
           />
           <ul class="desc">
               <li class="descel"><span class="bold">Likes:</span> ${likes}</li>
               <li class="descel"><span class="bold">Views:</span> ${views}</li>
               <li class="descel"><span class="bold">Comments:</span> ${comments}</li>
               <li class="descel"><span class="bold">Downloads:</span> ${downloads}</li>
             </ul>
         </a>
       </li>`);
       });
       gallery.insertAdjacentHTML("beforeend", imgCollection.join(""));
      
if (hits.length===15) {
  loadMoreBtn.dataset.visible = "true";
}
else{
  iziToast.show({
    title: '😢',
    message: "We're sorry, but you've reached the end of search results.",
    color: '#a4ccb1',
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
}
};

export { render, lightbox };
