var photoUrl = document.querySelector('#photourl');
var placeHolderImg = document.querySelector('.placeholder-img');

photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  var newUrl = event.target.value;
  placeHolderImg.setAttribute('src', newUrl);
}
