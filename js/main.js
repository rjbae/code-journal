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

function entryList(entry) {
  var list = document.createElement('li');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  list.appendChild(row);

  var column = document.createElement('div');
  column.setAttribute('class', 'column-half');
  row.appendChild(column);

  var img = document.createElement('img');
  img.setAttribute('class', 'entry-img');
  img.setAttribute('src', entry.photoUrl);
  column.appendChild(img);

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');
  row.appendChild(columnHalf);

  var header = document.createElement('h3');
  header.textContent = entry.title;
  columnHalf.appendChild(header);

  var entryText = document.createElement('div');
  entryText.setAttribute('class', 'entry-text');
  columnHalf.appendChild(entryText);

  var text = document.createElement('p');
  text.textContent = entry.notes;
  entryText.appendChild(text);

  return list;
}

var $list = document.querySelector('.entries-list');
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = entryList(data.entries[i]);
    $list.appendChild(entry);
  }
}

var $entriesNav = document.querySelector('.nav-entry');
var $saveButton = document.querySelector('.save-button');
var $newButton = document.querySelector('.new-button');

var $entries = document.querySelector('.entries');
var $entryForm = document.querySelector('.entry-form');

$entriesNav.addEventListener('click', viewEntries);
$saveButton.addEventListener('click', viewEntries);
$newButton.addEventListener('click', newEntries);

function viewEntries(event) {
  $entries.className = 'container entries';
  $entryForm.className = 'container entry-form hidden';
  data.view = 'entries';
}

function newEntries(event) {
  $entries.className = 'container entries hidden';
  $entryForm.className = 'container entry-form';
  data.view = 'entry-form';
}

if (data.view === 'entry-form') {
  newEntries();
} else {
  viewEntries();
}
