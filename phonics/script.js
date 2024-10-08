// Sample JSON Data (Can be loaded from external file)
const jsonData = [
 { "word": "fox", "image": "fox.png" },
 { "word": "car", "image": "car.jpg" },
 { "word": "tap", "image": "tap.jpg" },
 { "word": "bus", "image": "bus.png"},
 {"word":"bag", "image": "bag.png"},
 {"word":"mat", "image": "mat.png"},
 {"word":"cat", "image": "cat.png"},
 {"word":"dog", "image": "dog.png"},
 // {"word":"bed", "image": "bed.png"},
 {"word":"rain", "image": "rain.png"},
 {"word":"star", "image": "star.png"},
 {"word":"fish", "image": "fish.png"},
 // {"word":"box", "image": "box.png"},
 {"word":"ball", "image":"ball.png"},
 {"word":"duck", "image":"duck.png"},
 {"word":"frog", "image":"frog.png"},
 {"word":"door", "image":"door.png"},
 {"word":"sock", "image":"sock.png"}
];

// Game Variables
let score = 0;
const wordContainer = document.getElementById('word-container');
const imageContainer = document.getElementById('image-container');
const scoreElement = document.getElementById('score');

// Shuffle function to randomize arrays
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize Game
function initGame(data) {
  const shuffledWords = shuffle([...data]);
  const shuffledImages = shuffle([...data]);

  shuffledWords.forEach((item) => {
    const wordDiv = document.createElement('div');
    wordDiv.classList.add('word-box');
    wordDiv.innerText = item.word;
    wordDiv.setAttribute('data-word', item.word);
    wordContainer.appendChild(wordDiv);
  });

  shuffledImages.forEach((item) => {
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image-box');
    const img = document.createElement('img');
    img.src = "images/"+item.image;
    img.setAttribute('draggable', 'true');
    img.setAttribute('data-word', item.word);
    imageDiv.appendChild(img);
    imageContainer.appendChild(imageDiv);
  });

  addDragDropHandlers();
}

// Drag-and-Drop Handlers
function addDragDropHandlers() {
  const words = document.querySelectorAll('.word-box');
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    img.addEventListener('dragstart', dragStart);
  });

  words.forEach(word => {
    word.addEventListener('dragover', dragOver);
    word.addEventListener('drop', drop);
  });
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.getAttribute('data-word'));
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const draggedWord = e.dataTransfer.getData('text/plain');
  const targetWord = e.target.getAttribute('data-word');

  if (draggedWord === targetWord) {
    e.target.style.backgroundColor = 'lightgreen';
    score++;
    scoreElement.innerText = `Score: ${score}`;
    // Remove the image after match
    const imgToRemove = document.querySelector(`img[data-word="${draggedWord}"]`);
    if (imgToRemove) imgToRemove.parentNode.removeChild(imgToRemove);
  } else {
    e.target.style.backgroundColor = 'lightcoral';
  }
}

// Load game with sample data
window.onload = () => {
  initGame(jsonData);
};

