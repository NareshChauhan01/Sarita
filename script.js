var images = ['assets/photo.jpg'];
var currentIndex = 0;
var totalClicks = 0;

function getPieceSize() {
  return window.innerWidth < 600 ? 80 : 100;
}

function getPuzzleSize() {
  return getPieceSize() * 3;
}

function positionPiecesAtBottomCenter() {
  const puzzleItems = document.querySelectorAll('#puzz i');
  const pieceSize = getPieceSize();
  const spacing = 5;
  const count = puzzleItems.length;
  const totalWidth = pieceSize * count + spacing * (count - 1);
  const startLeft = (window.innerWidth - totalWidth) / 2;
  const bottomPos = window.innerHeight - pieceSize - 20;

  puzzleItems.forEach((piece, index) => {
    piece.style.left = (startLeft + index * (pieceSize + spacing)) + 'px';
    piece.style.top = bottomPos + 'px';
  });
}

function randomizeImage() {
  document.documentElement.style.setProperty('--image', 'url(' + images[currentIndex] + ')');
  currentIndex = (currentIndex + 1) % images.length;
  positionPiecesAtBottomCenter();
}

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
  document.getElementById('message').textContent = '';
  window.removeEventListener('keydown', handleEnterToRestart);
  randomizeImage();
}

function handleEnterToRestart(event) {
  if (event.key === 'Enter') {
    reloadPuzzle();
  }
}

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
          document.getElementById('message').textContent = '🎉 Puzzle completed! Press Enter to play again.';
          window.addEventListener('keydown', handleEnterToRestart);
        }, 1500);
      }
    }
  });
});

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

      setTimeout(() => {
        document.getElementById('message').textContent = '🎉 Puzzle completed! Press Enter to play again.';
        window.addEventListener('keydown', handleEnterToRestart);
      }, 1500);
    }
  }
}

window.addEventListener('resize', positionPiecesAtBottomCenter);
randomizeImage();