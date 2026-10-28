/**
 * Romantic Background Music Player
 * Complies with modern browser autoplay policies.
 * Includes play/pause, mute, track progress, visualizer feedback,
 * and a Web Audio synthesized romantic chime fallback if no MP3 is supplied.
 */
(function () {
  'use strict';

  var audio = document.getElementById('bg-music');
  var playBtns = document.querySelectorAll('.music-play-toggle');
  var muteBtns = document.querySelectorAll('.music-mute-toggle');
  var vinyls = document.querySelectorAll('.vinyl-disc');
  var soundwaves = document.querySelectorAll('.soundwave-bar');
  var musicStatusLabels = document.querySelectorAll('.music-status-text');

  var isPlaying = false;
  var isMuted = false;
  var hasLocalAudioFile = true;
  var synthAudioCtx = null;
  var synthInterval = null;

  // Romantic Pentatonic Music Box Notes (Frequencies in Hz)
  var romanticNotes = [
    261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00
  ];

  function playSynthTone(freq) {
    if (!synthAudioCtx) {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) synthAudioCtx = new AudioCtx();
    }
    if (!synthAudioCtx) return;

    var osc = synthAudioCtx.createOscillator();
    var gain = synthAudioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, synthAudioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, synthAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, synthAudioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, synthAudioCtx.currentTime + 1.6);

    osc.connect(gain);
    gain.connect(synthAudioCtx.destination);

    osc.start();
    osc.stop(synthAudioCtx.currentTime + 1.8);
  }

  function startSynthMelody() {
    if (synthInterval) clearInterval(synthInterval);
    var melodyStep = 0;
    // Gentle lullaby pattern
    var pattern = [0, 2, 4, 7, 5, 4, 2, 4, 0, 4, 7, 9, 7, 4, 2, 0];
    synthInterval = setInterval(function () {
      if (!isPlaying || isMuted) return;
      var noteIndex = pattern[melodyStep % pattern.length];
      playSynthTone(romanticNotes[noteIndex]);
      melodyStep++;
    }, 420);
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function updateUI(playing) {
    isPlaying = playing;
    playBtns.forEach(function (btn) {
      btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      var icon = btn.querySelector('.play-icon');
      var label = btn.querySelector('.play-label');
      if (icon) icon.textContent = playing ? '⏸' : '▶';
      if (label) label.textContent = playing ? 'Pause Music' : 'Play Music';
    });

    vinyls.forEach(function (disc) {
      if (playing) {
        disc.classList.add('spinning');
      } else {
        disc.classList.remove('spinning');
      }
    });

    soundwaves.forEach(function (wave) {
      if (playing) {
        wave.classList.add('animating');
      } else {
        wave.classList.remove('animating');
      }
    });

    musicStatusLabels.forEach(function (status) {
      status.textContent = playing ? 'Playing romantic melody...' : 'Paused';
    });
  }

  function togglePlay() {
    if (!isPlaying) {
      if (audio && hasLocalAudioFile && audio.src && !audio.src.endsWith('#')) {
        var playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(function () {
            updateUI(true);
          }).catch(function (error) {
            console.log('Local audio file not available or blocked, falling back to romantic music box chime:', error);
            hasLocalAudioFile = false;
            updateUI(true);
            startSynthMelody();
          });
        }
      } else {
        updateUI(true);
        startSynthMelody();
      }
    } else {
      if (audio) {
        audio.pause();
      }
      stopSynthMelody();
      updateUI(false);
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (audio) {
      audio.muted = isMuted;
    }
    muteBtns.forEach(function (btn) {
      btn.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
      btn.textContent = isMuted ? '🔇 Unmute' : '🔊 Mute';
    });
  }

  // Audio element events
  if (audio) {
    audio.addEventListener('error', function () {
      console.log('Audio file assets/music.mp3 not found yet. Using romantic chime synth fallback.');
      hasLocalAudioFile = false;
    });

    audio.addEventListener('ended', function () {
      audio.currentTime = 0;
      audio.play();
    });
  }

  // Bind clicks
  playBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePlay();
    });
  });

  muteBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMute();
    });
  });

  // Global helper if other buttons want to trigger music
  window.romanticMusic = {
    play: function () { if (!isPlaying) togglePlay(); },
    pause: function () { if (isPlaying) togglePlay(); },
    toggle: togglePlay
  };

})();
