let totalClicks = 0;

function randomizeImage() {
  const puzzleItems = document.querySelectorAll('#puzz i');
  puzzleItems.forEach(i => {
    i.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    i.style.top = Math.random() * (window.innerHeight - 100) + 'px';
  });
}

function reloadPuzzle() {
  document.querySelectorAll('.done').forEach(el => el.classList.remove('done'));
  document.querySelectorAll('.dropped').forEach(el => el.classList.remove('dropped'));
  const puz = document.querySelector('#puz');
  puz.classList.remove('allDone');
  puz.style.border = '3px dashed lightgray';
  puz.style.animation = '';
  document.getElementById("message").style.display = "none";
  randomizeImage();
}

// Click behavior for mobile/desktop
document.querySelectorAll('#puzz i').forEach(el => {
  el.addEventListener('mousedown', () => {
    totalClicks++;
    document.getElementById('clicks').innerText = totalClicks;
  });

  el.addEventListener('click', () => {
    const current = document.querySelector('.clicked');
    if (current) current.classList.remove('clicked');
    el.classList.toggle('clicked');
  });
});

document.querySelectorAll('#puz i').forEach(el => {
  el.addEventListener('click', () => {
    const clicked = document.querySelector('.clicked');
    if (clicked && clicked.classList.contains(el.className)) {
      el.classList.add('dropped');
      clicked.classList.add('done');
      clicked.classList.remove('clicked');
      checkCompletion();
    }
  });
});

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.className); }

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  if (ev.target.className === data) {
    ev.target.classList.add('dropped');
    document.querySelector(`.${data}[draggable='true']`).classList.add('done');
    checkCompletion();
  }
}

function checkCompletion() {
  if (document.querySelectorAll('.dropped').length === 9) {
    const puz = document.getElementById('puz');
    puz.classList.add('allDone');
    puz.style.border = 'none';
    puz.style.animation = 'allDone 1s linear forwards';
    document.getElementById("message").style.display = "block";
  }
}

// Press Enter to reset
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && document.querySelectorAll('.dropped').length === 9) {
    reloadPuzzle();
  }
});

randomizeImage();