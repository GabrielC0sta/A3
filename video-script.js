(function loadYouTubeAPI() {
  if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
})();

let player;

// ✅ 🔥 Banco de dados dos ODS
const odsData = {
  "1": {
    videoId: "y0md8kdFgx0",
    title: "Erradicação da Pobreza",
    gradient: "linear-gradient(270deg, #fd0000, #333, #111)",
    color: "#fd0000"
  },
  "2": {
    videoId: "rvET4ADE8JQ",
    title: "Fome Zero e Agricultura Sustentável",
    gradient: "linear-gradient(270deg, #e5ff00, #333, #111)",
    color: "#e5ff00"
  },
  "3": {
    videoId: "LMOynUxsGHo",
    title: "Saúde e Bem-Estar",
    gradient: "linear-gradient(270deg, #15f800, #333, #111)",
    color: "#15f800"
  },
  "4": {
    videoId: "htHKxLMIWrY",
    title: "Educação de Qualidade",
    gradient: "linear-gradient(270deg, #ff0000, #333, #111)",
    color: "#ff0000"
  },
  "5": {
    videoId: "Mm0gzKOiJVU",
    title: "Igualdade de Gênero",
    gradient: "linear-gradient(270deg, #ff6600, #333, #111)",
    color: "#ff6600"
  },
  "6": {
    videoId: "ydH9YpoxpsI",
    title: "Água Potável e Saneamento",
    gradient: "linear-gradient(270deg, #0084ff, #333, #111)",
    color: "#0084ff"
  },
  "7": {
    videoId: "Qi5EQ_n0DNo",
    title: "Energia Limpa e Acessível",
    gradient: "linear-gradient(270deg, #eeff00, #333, #111)",
    color: "#eeff00"
  },
  "8": {
    videoId: "AGV3rW83UKk",
    title: "Trabalho Decente e Crescimento Econômico",
    gradient: "linear-gradient(270deg, #ff0037, #333, #111)",
    color: "#ff0037"
  },
  "9": {
    videoId: "ghQZfF0nEdQ",
    title: "Indústria, Inovação e Infraestrutura",
    gradient: "linear-gradient(270deg, #ff7b00, #333, #111)",
    color: "#ff7b00"
  },
  "10": {
    videoId: "DGLMC3Mcygc",
    title: "Redução das Desigualdades",
    gradient: "linear-gradient(270deg, #ff0055, #333, #111)",
    color: "#ff0055"
  },
  "11": {
    videoId: "GCml3wU2g7g",
    title: "Cidades e Comunidades Sustentáveis",
    gradient: "linear-gradient(270deg, #ff7b00, #333, #111)",
    color: "#ff7b00"
  },
  "12": {
    videoId: "tMtMphzAcK8",
    title: "Consumo e Produção Responsáveis",
    gradient: "linear-gradient(270deg, #ffe600, #333, #111)",
    color: "#ffe600"
  },
  "13": {
    videoId: "ruOzd5Mthnc",
    title: "Ação Contra a Mudança Climática",
    gradient: "linear-gradient(270deg, #00ff2a, #333, #111)",
    color: "#00ff2a"
  },
  "14": {
    videoId: "-Qy6HtE0GZU",
    title: "Vida na Água",
    gradient: "linear-gradient(270deg, #00c3ff, #333, #111)",
    color: "#00c3ff"
  },
  "15": {
    videoId: "Q5TYYyD7HB8",
    title: "Vida Terrestre",
    gradient: "linear-gradient(270deg, #00ff37, #333, #111)",
    color: "#00ff37"
  },
  "16": {
    videoId: "RkRpbUt1fCM",
    title: "Paz, Justiça e Instituições Eficazes",
    gradient: "linear-gradient(270deg, #e5ff00, #333, #111)",
    color: "#e5ff00"
  },
  "17": {
    videoId: "zzqUdXGKkW0",
    title: "Parcerias e Meios de Implementação",
    gradient: "linear-gradient(270deg, #0011ff, #333, #111)",
    color: "#0011ff"
  }
};

function getODSFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ods') || "1";
}

const currentODS = getODSFromURL();
const odsInfo = odsData[currentODS] || odsData["1"];

function applyColors() {
  const color = odsInfo.color;

  document.body.style.background = odsInfo.gradient;
  document.querySelector('.video-container').style.background = 'rgba(0,0,0,0.7)';

  document.documentElement.style.setProperty('--main-color', color);

  document.querySelector('.badge.yellow').style.backgroundColor = color;
  document.querySelector('.progress-bar').style.backgroundColor = color;

  const restartBtn = document.querySelector('.restart-button');
  restartBtn.style.backgroundColor = color;
  restartBtn.onmouseenter = () => restartBtn.style.backgroundColor = lightenColor(color, 20);
  restartBtn.onmouseleave = () => restartBtn.style.backgroundColor = color;

  document.getElementById('video-title').innerText = odsInfo.title;
  document.getElementById('yt-link').href = `https://www.youtube.com/watch?v=${odsInfo.videoId}`;
  document.title = odsInfo.title + " | ODS Player";

  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach(link => {
    link.style.color = 'white';
    link.onmouseenter = () => link.style.color = color;
    link.onmouseleave = () => link.style.color = 'white';
  });

  const ytLink = document.querySelector('.yt-link a');
  ytLink.onmouseenter = () => {
    ytLink.style.backgroundColor = color;
    ytLink.style.color = '#111';
  };
  ytLink.onmouseleave = () => {
    ytLink.style.backgroundColor = '#333';
    ytLink.style.color = 'white';
  };
}

function createPlayer() {
  if (player) {
    player.destroy();
  }

  applyColors();

  player = new YT.Player('player', {
    height: '450',
    width: '800',
    videoId: odsInfo.videoId,
    playerVars: {
      playsinline: 1,
      controls: 0,
      rel: 0,
      showinfo: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onYouTubeIframeAPIReady() {
  createPlayer();
}

if (window.YT && window.YT.Player) {
  createPlayer();
} else {
  window.onYouTubeIframeAPIReady = createPlayer;
}

function onPlayerReady(event) {
  setInterval(updateTime, 1000);
  player.setVolume(50);
}

function onPlayerStateChange(event) {
  const btn = document.querySelector('.restart-button');
  if (event.data === YT.PlayerState.ENDED) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
}

function restartVideo() {
  if (player) {
    player.seekTo(0);
    player.playVideo();
  }
}

function seekVideo(event) {
  if (!player) return;
  const progress = document.querySelector('.progress');
  const rect = progress.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  const duration = player.getDuration();
  player.seekTo(duration * percent);
}

function updateTime() {
  if (player && typeof player.getDuration === 'function') {
    const current = formatTime(player.getCurrentTime());
    const total = formatTime(player.getDuration());
    document.getElementById('video-time').innerText = `${current} / ${total}`;

    const percent = (player.getCurrentTime() / player.getDuration()) * 100;
    document.getElementById('progressBar').style.width = percent + '%';
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const volumeRange = document.getElementById('volumeRange');
if (volumeRange) {
  volumeRange.addEventListener('input', () => {
    const volume = parseInt(volumeRange.value, 10);
    if (player) {
      player.setVolume(volume);
    }
  });
}

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}
