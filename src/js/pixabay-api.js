import axios from 'axios';

const getImgs = userRequest =>{
return axios.get('https://pixabay.com/api/',{
    params:
            {
            key: '49241808-b19f3ed80577ae196aabc5d53',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            q: userRequest,
            }
    })
            .then(res => res.data.hits)

}
 
 export default getImgs;
