var images = ['assets/photo.jpg'];
var currentIndex = 0;
var totalClicks = 0;

// Set puzzle image on root css variable
function randomizeImage() {
  document.documentElement.style.setProperty('--image', 'url(' + images[currentIndex] + ')');
  currentIndex = (currentIndex + 1) % images.length;
}

randomizeImage();

// Restart puzzle state
function reloadPuzzle() {
  document.querySelectorAll('.done').forEach(el => el.classList.remove('done'));
  document.querySelectorAll('.dropped').forEach(el => el.classList.remove('dropped'));
  const allDoneElement = document.querySelector('.allDone');
  if (allDoneElement) {
    allDoneElement.style = '';
    allDoneElement.classList.remove('allDone');
  }
  totalClicks = 0;
  document.querySelector('#clicks').textContent = 'Clicks: ' + totalClicks;
  randomizeImage();
}

// Handle clicks on draggable pieces to count and highlight
document.querySelectorAll('#puzz i').forEach(el => {
  el.addEventListener('mousedown', () => {
    totalClicks++;
    document.querySelector('#clicks').textContent = 'Clicks: ' + totalClicks;
  });
  el.addEventListener('click', function () {
    const active = document.querySelector('.clicked');
    if (active) active.classList.remove('clicked');
    this.classList.add('clicked');
  });
});

// Handle clicks on puzzle slots
document.querySelectorAll('#puz i').forEach(el => {
  el.addEventListener('click', function () {
    const clicked = document.querySelector('.clicked');
    if (clicked && clicked.classList.contains(el.classList[0])) {
      el.classList.add('dropped');
      clicked.classList.add('done');
      clicked.classList.remove('clicked');

      if (document.querySelectorAll('.dropped').length === 9) {
        const puz = document.querySelector('#puz');
        puz.classList.add('allDone');
        puz.style.border = 'none';
        puz.style.animation = 'allDone 1s linear forwards';

        setTimeout(() => {
          alert('Puzzle completed! Press Restart to play again.');
          reloadPuzzle();
        }, 1500);
      }
    }
  });
});

// Drag & drop handlers
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.className === data) {
    ev.target.classList.add('dropped');
    document.querySelector('.' + data + "[draggable='true']").classList.add('done');

    if (document.querySelectorAll('.dropped').length === 9) {
      const puz = document.querySelector('#puz');
      puz.classList.add('allDone');
      puz.style.border = 'none';
      puz.style.animation = 'allDone 1s linear forwards';

      // setTimeout(() => {
      //   alert('Puzzle completed! Press Restart to play again.');
      //   reloadPuzzle();
      // }, 1500);
    }
  }
}