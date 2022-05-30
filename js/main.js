var $photoUrl = document.querySelector('.photo-url');
var $placeHolderImg = document.querySelector('.placeholder-img');

$photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  var newUrl = event.target.value;
  $placeHolderImg.setAttribute('src', newUrl);
}

var $form = document.querySelector('.form');
$form.addEventListener('submit', formEvent);

function formEvent(event) {
  event.preventDefault();
  var formEntry = {};
  formEntry.title = $form.elements.title.value;
  formEntry.photoUrl = $form.elements.photoUrl.value;
  formEntry.notes = $form.elements.notes.value;
  formEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formEntry);
  $placeHolderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
