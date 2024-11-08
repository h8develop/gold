<template>
  <div class="home-container">
    <!-- Верхняя панель с названием бота, профилем и кнопкой "О токене" -->
    <div class="top-bar">
      <div class="profile">
        <img :src="userAvatar" alt="Avatar" class="avatar" />
        <span class="username">{{ userName }}</span>
      </div>
      <h1 class="bot-title">GoldenBust</h1>
      <button class="about-token" @click="goToTokenPage">О токене</button>
    </div>

    <!-- Валюта и доходы -->
    <div class="header">
      <img src="../assets/valuta.png" alt="coin" class="valuta-icon" />
      <h2 class="score" id="score">{{ scoreStore.score }}</h2>
      <div class="earnings">
        <div class="earning-item">
          <p>{{ scoreStore.hourlyEarnings }} монет / час</p>
        </div>
        <div class="earning-item">
          <p>{{ scoreStore.tapEarnings }} монет / тап</p>
        </div>
      </div>
    </div>

    <!-- Монетка -->
    <div class="circle">
      <img @click="increment" ref="img" id="circle" src="../assets/tap_bols.png" alt="Click Target" />
    </div>

    <!-- Счетчик кликов -->
    <div class="tap-counter">
      <img src="../assets/white_coin_energy.png" alt="Icon" class="tap-icon" />
      <p>{{ scoreStore.energy }} / {{ scoreStore.maxEnergy }}</p>
    </div>

    <!-- Контейнер для конкурса -->
    <div class="contest-container" @click="goToDailyTasks">
      <img src="../assets/white_icon_dollar.png" alt="Конкурс" class="contest-image" />
      <div class="timer">
        <p>Стань участником розыгрыша {{ timeLeft }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useScoreStore } from '@/stores/score';
import { useRouter } from 'vue-router';

const scoreStore = useScoreStore();
const img = ref(null);
const router = useRouter();

// Пример данных пользователя
const userAvatar = ref('../assets/default-avatar.png');
const userName = ref('Имя пользователя');

// Таймер обратного отсчёта
const timeLeft = ref('00:00:00');

function updateTimer() {
  const endTime = new Date('2024-12-31T23:59:59');
  const currentTime = new Date();
  const timeDiff = endTime - currentTime;

  if (timeDiff > 0) {
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    timeLeft.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    timeLeft.value = '00:00:00';
  }
}

onMounted(() => {
  scoreStore.loadState(); // Восстанавливаем состояние при монтировании
  updateTimer(); // Запускаем таймер
  setInterval(updateTimer, 1000); // Обновляем таймер каждую секунду
});


// Переходы
function goToDailyTasks() {
  router.push('/tasks/Daily');
}

function goToTokenPage() {
  router.push('/token-info');
}

function increment(event) {
  scoreStore.incrementScore();
  const rect = event.target.getBoundingClientRect();
  const offsetX = event.clientX - rect.left - rect.width / 2;
  const offsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 60;
  const tiltX = (offsetY / rect.height) * DEG;
  const tiltY = (offsetX / rect.width) * -DEG;
  img.value.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

  setTimeout(() => {
    img.value.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }, 300);

  const plusOne = document.createElement('div');
  plusOne.classList.add('plus-one');
  plusOne.textContent = `+${scoreStore.tapEarnings}`;
  plusOne.style.left = `${event.clientX - rect.left}px`;
  plusOne.style.top = `${event.clientY - rect.top}px`;
  img.value.parentElement.appendChild(plusOne);
  setTimeout(() => plusOne.remove(), 2000);
}
</script>
