let loaderContainer = document.querySelector(".loader-container");
let imageContainer = document.querySelector("#image-container");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];
let photos = "";

// unsplash API
let count = 6;
const apikey = "MWYry-l8e1MiHLEVtqi7xgjP0ZF0p6gqhxyrMbe1aFc";
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// check if all image were loaded
const imageloaded = () => {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    loaderContainer.hidden = true;
    ready = true;
  }
};



const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photoArray.length;

  console.log(photoArray);
  photoArray.map((photo) => {
    photos += `<img src=${photo.urls.regular} onload=${imageloaded()} alt="b">`;
  });

  imageContainer.innerHTML = photos;
};



// get photos from Unsplash API

const getPhotos = async () => {
  try {
    const response = await fetch(apiurl);
    photoArray = await response.json();

    displayPhotos();
  } catch (error) {
    //catch error
    // throw new Error(error.message);
  }
};

//scroll eventlistener
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//   // onload
getPhotos();
