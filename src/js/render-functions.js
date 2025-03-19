import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: "alt",
  captionDelay: 250,
});
const render = hits =>{
  gallery.innerHTML = "";
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
};

export { render, lightbox };
