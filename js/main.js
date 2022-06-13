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
  if (data.editing === null) {
    var entryObj = {};
    entryObj.entryId = data.nextEntryId;
  } else {
    var list = data.editing;
    entryObj = getEntryObj(list);
  }
  entryObj.title = $form.elements.title.value;
  entryObj.photoUrl = $form.elements.photoUrl.value;
  entryObj.notes = $form.elements.notes.value;

  var entriesList = entryList(entryObj);
  if (data.editing === null) {
    $list.prepend(entriesList);
    data.entries.unshift(entryObj);
    data.nextEntryId++;
  } else {
    list.replaceWith(entriesList);
  }
  viewEntries();
}

function entryList(entry) {
  var list = document.createElement('li');
  list.className = 'entry';
  list.setAttribute('data-entry-id', entry.entryId);

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

  var icon = document.createElement('i');
  icon.setAttribute('class', 'fa-solid fa-pencil');
  icon.setAttribute('data-entry-id', entry.entryId);
  header.appendChild(icon);

  var entryText = document.createElement('div');
  entryText.setAttribute('class', 'entry-text');
  columnHalf.appendChild(entryText);

  var text = document.createElement('p');
  text.textContent = entry.notes;
  entryText.appendChild(text);

  return list;
}

var $list = document.querySelector('.entries-list');
document.addEventListener('DOMContentLoaded', domContentLoaded);

function domContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = entryList(data.entries[i]);
    $list.appendChild(entry);
  }
}

var $entriesNav = document.querySelector('.nav-entry');
var $newButton = document.querySelector('.new-button');

var $entries = document.querySelector('.entries');
var $entryForm = document.querySelector('.entry-form');

$entriesNav.addEventListener('click', viewEntries);
$newButton.addEventListener('click', newEntries);

function viewEntries(event) {
  $entries.className = 'container entries';
  $entryForm.className = 'container entry-form hidden';
  data.view = 'entries';
  $deleteButton.className = 'hidden';
  data.editing = null;
}

function newEntries(event) {
  $title.textContent = 'New Entry';
  $form.reset();
  $placeHolderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewEntryForm();
}

function viewEntryForm(event) {
  $entries.className = 'container entries hidden';
  $entryForm.className = 'container entry-form';
  data.view = 'entry-form';
}

$list.addEventListener('click', editEvent);
var $title = document.querySelector('h1');

function editEvent(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  viewEntryForm();
  $deleteButton.className = 'delete-entry';

  var entryList = event.target.closest('li');
  data.editing = entryList;
  var entryObj = getEntryObj(entryList);
  $title.textContent = 'Edit Entry';

  $form.title.value = entryObj.title;
  $form.photoUrl.value = entryObj.photoUrl;
  $placeHolderImg.setAttribute('src', entryObj.photoUrl);
  $form.notes.value = entryObj.notes;
}

function getEntryObj(entryList) {
  var entryId = entryList.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId.toString()) {
      var entryObj = data.entries[i];
      return entryObj;
    }
  }
}

var $deleteButton = document.querySelector('.delete-entry');
var $cancelButton = document.querySelector('.cancel-button');
var $confirmButton = document.querySelector('.confirm-button');

var $modalContainer = document.querySelector('.modal-container');

$deleteButton.addEventListener('click', openModal);
function openModal(event) {
  $modalContainer.className = 'modal-container background';
}

$cancelButton.addEventListener('click', cancelEvent);
function cancelEvent(event) {
  $modalContainer.className = 'hidden';
}

$confirmButton.addEventListener('click', confirmEvent);
function confirmEvent(event) {
  var list = document.querySelector('.entry');
  var entryId = list.getAttribute('data-entry-id');

  var entryNodes = document.querySelectorAll('.entry');
  for (var i = 0; i < entryNodes.length; i++) {
    if (entryNodes[i].getAttribute('data-entry-id') === entryId) {
      entryNodes[i].remove();
    }
  }
  for (i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId.toString()) {
      data.entries.splice(i, 1);
    }
  }
  cancelEvent();
  viewEntries();
}

if (data.view === 'entry--form') {
  viewEntryForm();
} else {
  viewEntries();
}
