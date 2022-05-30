/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var entries = localStorage.getItem('data-entries');

window.addEventListener('beforeunload', unloadEvent);

if (entries !== null) {
  data = JSON.parse(entries);
}

function unloadEvent(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('data-entries', entriesJSON);
}
