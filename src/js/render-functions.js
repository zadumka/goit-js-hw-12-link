const loader = document.querySelector('.loader')Add commentMore actions

export const loadBtn = document.querySelector('.load-more-btn')



export function createGallery(images) {
    return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
<li class="gallery-item"><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}">
<div class="info">
<p><b>Likes</b>${likes}</p>
<p><b>Views</b>${views}</p>
<p><b>Comments</b>${comments}</p>
<p><b>Downloads</b>${downloads}</p>
</div>
</a></li>
    `).join('')
}

export function clearGallery() {
    list.innerHTML = ''
}

export function showLoader() {
    loader.classList.remove('hidden');
}
export function hideLoader() {
    loader.classList.add('hidden');
}
export function showLoadMoreButton() {
    loadBtn.classList.remove('load-more-btn-hidden');
}
export function hideLoadMoreButton() {
    loadBtn.classList.add('load-more-btn-hidden');

}
