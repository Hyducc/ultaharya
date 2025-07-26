// Pesan Ulang Tahun
function showMessage() {
  const message = `
    Ayah tersayang ❄️

    Happy birthday, Ayah!
    Semoga makin sabar menghadapi anak-anak yang bandel (terutama yang nulis ini 😅).
    Terima kasih sudah kerja keras... dan tetap pura-pura ngerti soal teknologi.
    Love you, Ayah! Meski kadang ekspresinya diam-diam aja, tapi sayangnya dalem banget ❤️
  `;
  const msgElement = document.getElementById("message");
  msgElement.innerText = message;
  msgElement.style.whiteSpace = "pre-line";
}

// Game Bola Salju
let score = 0;
let timeLeft = 20;
let gameInterval;
let timerInterval;

function startGame() {
  const gameArea = document.getElementById("game-area");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");

  score = 0;
  timeLeft = 20;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  gameArea.innerHTML = `<p class="game-info">Waktu: <span id="timer">20</span>s | Skor: <span id="score">0</span></p>`;
  gameArea.classList.remove("hidden");

  gameInterval = setInterval(spawnSnowball, 800);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      setTimeout(() => {
        alert(`☃️ Waktu habis! Skor Akhir: ${score} poin`);
      }, 100);
    }
  }, 1000);
}

function spawnSnowball() {
  const gameArea = document.getElementById("game-area");
  const ball = document.createElement("div");
  ball.classList.add("snowball");

  const x = Math.random() * (gameArea.clientWidth - 40);
  ball.style.left = `${x}px`;
  ball.style.animationDuration = `${Math.random() * 2 + 1.5}s`;

  ball.onclick = function () {
    score++;
    document.getElementById("score").textContent = score;
    ball.remove();
  };

  gameArea.appendChild(ball);

  setTimeout(() => {
    if (ball.parentElement) ball.remove();
  }, 4000);
}

// ❄️ Background Salju Turun (canvas)
const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");
let snowflakes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createSnowflakes() {
  for (let i = 0; i < 100; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.5 - 0.25
    });
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  snowflakes.forEach((flake) => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
  });
  ctx.fill();
  updateSnowflakes();
}

function updateSnowflakes() {
  snowflakes.forEach((flake) => {
    flake.y += flake.speedY;
    flake.x += flake.speedX;

    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  });
}

resizeCanvas();
createSnowflakes();
setInterval(drawSnowflakes, 30);
window.addEventListener("resize", () => {
  resizeCanvas();
  snowflakes = [];
  createSnowflakes();
});
