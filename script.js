const noteTitleInput = document.getElementById('note-title');
const noteContentTextarea = document.getElementById('note-content');
const saveButton = document.getElementById('save');
const editButton = document.getElementById('edit');
const deleteButton = document.getElementById('delete');
const viewHtmlButton = document.getElementById('view-html');
const noteHtmlDiv = document.getElementById('note-html');
const noteList = document.getElementById('note-list');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let selectedNoteIndex = -1;

function renderNotes() {
  noteList.innerHTML = '';
  notes.forEach((note, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = note.title;
    listItem.classList.add('cursor-pointer', 'hover:underline', 'text-lg','p-3');
    listItem.dataset.index = index;
    noteList.appendChild(listItem);
  });
}

function updateNoteListSelection() {
  const noteItems = document.querySelectorAll('[data-index]');
  noteItems.forEach((item, index) => {
    if (index === selectedNoteIndex) {
      item.classList.add('font-semibold', 'bg-gray-200', 'rounded');
    } else {
      item.classList.remove('font-semibold', 'bg-gray-200', 'rounded');
    }
  });
}

renderNotes();
updateNoteListSelection();

saveButton.addEventListener('click', () => {
  const title = noteTitleInput.value;
  const content = noteContentTextarea.value;

  if (title && content) {
    if (selectedNoteIndex !== -1) {
      notes[selectedNoteIndex] = { title, content };
    } else {
      notes.push({ title, content });
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    selectedNoteIndex = -1;
    updateNoteListSelection();
    noteTitleInput.value = '';
    noteContentTextarea.value = '';
  }
});

editButton.addEventListener('click', () => {
  if (selectedNoteIndex !== -1) {
    noteTitleInput.value = notes[selectedNoteIndex].title;
    noteContentTextarea.value = notes[selectedNoteIndex].content;
  }
});

deleteButton.addEventListener('click', () => {
  if (selectedNoteIndex !== -1) {
    notes.splice(selectedNoteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    selectedNoteIndex = -1;
    updateNoteListSelection();
    noteTitleInput.value = '';
    noteContentTextarea.value = '';
  }
});

viewHtmlButton.addEventListener('click', () => {
  if (selectedNoteIndex !== -1) {
    const content = notes[selectedNoteIndex].content;
    noteHtmlDiv.innerHTML = content;
    noteHtmlDiv.classList.remove('hidden');
  }
});

noteList.addEventListener('click', (event) => {
  const index = event.target.dataset.index;
  if (index !== undefined) {
    selectedNoteIndex = parseInt(index);
    const selectedNote = notes[selectedNoteIndex];
    noteTitleInput.value = selectedNote.title;
    noteContentTextarea.value = selectedNote.content;
    updateNoteListSelection();
  }
});
