import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.querySelector(".gallery");
let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images.map(img => `
    <li>
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy">
        <div class="info">
          <p>Likes: ${img.likes}</p>
          <p>Views: ${img.views}</p>
          <p>Comments: ${img.comments}</p>
          <p>Downloads: ${img.downloads}</p>
        </div>
      </a>
    </li>
  `).join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  document.querySelector(".loader").style.display = "block";
}

export function hideLoader() {
  document.querySelector(".loader").style.display = "none";
}

export function showNoResults() {
  iziToast.info({
    title: 'Oops!',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight'
  });
}
