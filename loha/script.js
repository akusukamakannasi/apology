const swipeContainer = document.querySelector(".swipe-container");
let currentPage = 0;
const totalPages = document.querySelectorAll(".page").length;
const SWIPE_THRESHOLD = 100;
let startX = 0;
let isDragging = false;

function updateSwipe() {
  const offset = -currentPage * 100;
  swipeContainer.style.transform = `translateX(${offset}vw)`;

  if (currentPage === totalPages - 1) {
    document.querySelector(".special-button").style.display = "block";
  } else {
    document.querySelector(".special-button").style.display = "none";
  }
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateSwipe();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updateSwipe();
  }
}

swipeContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
});

swipeContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;

  if (deltaX > SWIPE_THRESHOLD) {
    prevPage();
    isDragging = false;
  } else if (deltaX < -SWIPE_THRESHOLD) {
    nextPage();
    isDragging = false;
  }
});

swipeContainer.addEventListener("mouseup", () => {
  isDragging = false;
});

swipeContainer.addEventListener("mouseleave", () => {
  isDragging = false;
});

swipeContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

swipeContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - startX;

  if (deltaX > SWIPE_THRESHOLD) {
    prevPage();
    isDragging = false;
  } else if (deltaX < -SWIPE_THRESHOLD) {
    nextPage();
    isDragging = false;
  }
});

swipeContainer.addEventListener("touchend", () => {
  isDragging = false;
});

function goToNextPage() {
  document.querySelector(".swipe-container").style.display = "none";
  document.getElementById("interactive-page").style.display = "block";
}

const noButton = document.querySelector(".no");
const container = document.querySelector(".container");
const nextPageElement = document.getElementById("next-page");

function moveButton() {
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const newX = Math.random() * (windowWidth - buttonWidth);
  const newY = Math.random() * (windowHeight - buttonHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${newX}px`;
  noButton.style.top = `${newY}px`;
}

function sayYes() {
  container.style.display = "none";
  nextPageElement.classList.remove("hidden");
  startConfetti();
  playSound();
}

function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  const colors = ["#FFC107", "#FF4081", "#3F51B5", "#4CAF50", "#F44336", "#FFEB3B"];

  for (let i = 0; i < 400; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      speed: Math.random() * 5 + 2,
      opacity: Math.random() * 1,
      angle: Math.random() * Math.PI * 2,
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((confetto) => {
      confetto.y += confetto.speed;
      if (confetto.y > canvas.height) {
        confetto.y = -confetto.size;
      }
      ctx.globalAlpha = confetto.opacity;
      ctx.fillStyle = confetto.color;
      ctx.beginPath();
      ctx.arc(confetto.x, confetto.y, confetto.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(drawConfetti);
  }

  drawConfetti();
}

function playSound() {
  const audio = new Audio("path/to/your/sound-file.mp3");
  audio.play();
}
