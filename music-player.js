// Lista de músicas para a lua de mel em Paris
const playlist = [
  {
    title: "La Vie en Rose",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Substitua pela URL real
  },
  {
    title: "Clair de Lune",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" // Substitua pela URL real
  },
  {
    title: "Debussy - Rêverie",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" // Substitua pela URL real
  }
];

let currentTrackIndex = 0;
let isPlaying = false;

const audio = document.getElementById('weddingAudio');
const musicToggle = document.getElementById('musicToggle');
const musicPrev = document.getElementById('musicPrev');
const musicNext = document.getElementById('musicNext');
const musicProgress = document.getElementById('musicProgress');
const musicTitle = document.getElementById('musicTitle');
const musicDisc = document.getElementById('musicDisc');
const musicHint = document.getElementById('musicHint');

// Inicializar com a primeira música
function initPlayer() {
  loadTrack(currentTrackIndex);
  updatePlayButton();
  musicHint.textContent = "Clique em ▶ para começar a música";
}

function loadTrack(index) {
  if (index >= 0 && index < playlist.length) {
    currentTrackIndex = index;
    const track = playlist[index];
    audio.src = track.src;
    musicTitle.textContent = track.title;
  }
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch(err => {
      console.log('Erro ao tocar música:', err);
    });
    isPlaying = true;
  }
  updatePlayButton();
}

function updatePlayButton() {
  if (isPlaying) {
    musicToggle.textContent = '⏸';
    musicToggle.setAttribute('aria-label', 'Pausar música');
    musicDisc.style.animation = 'spin 3s linear infinite';
  } else {
    musicToggle.textContent = '▶';
    musicToggle.setAttribute('aria-label', 'Tocar música');
    musicDisc.style.animation = 'none';
  }
}

function nextTrack() {
  loadTrack((currentTrackIndex + 1) % playlist.length);
  if (isPlaying) {
    audio.play();
  }
}

function prevTrack() {
  loadTrack((currentTrackIndex - 1 + playlist.length) % playlist.length);
  if (isPlaying) {
    audio.play();
  }
}

// Event listeners
musicToggle.addEventListener('click', togglePlay);
musicNext.addEventListener('click', nextTrack);
musicPrev.addEventListener('click', prevTrack);

// Atualizar progresso
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    musicProgress.value = progress;
  }
});

// Controlar música pela barra de progresso
musicProgress.addEventListener('change', (e) => {
  const newTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Próxima música quando acabar
audio.addEventListener('ended', nextTrack);

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayer);
} else {
  initPlayer();
}

// Adicionar animação de spin ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
