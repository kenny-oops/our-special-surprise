/**
 * Our Little Forever — Main Interactive Logic
 * Handles smooth navigation, interactive love letter envelope,
 * image fallbacks, memory card expansion, and final surprise reveal.
 */
(function () {
  'use strict';

  // --- Smooth Scrolling for Navigation & Hero CTA ---
  var scrollTriggers = document.querySelectorAll('[data-scroll-to]');
  scrollTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = trigger.getAttribute('data-scroll-to');
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Image Fallback Handler ---
  // Gracefully handles missing photos without ugly broken image icons
  var photoImages = document.querySelectorAll('.managed-photo');
  photoImages.forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      var fallbackContainer = img.nextElementSibling;
      if (fallbackContainer && fallbackContainer.classList.contains('photo-placeholder-fallback')) {
        fallbackContainer.style.display = 'flex';
      }
    });

    // Check if image is already loaded or broken
    if (img.complete && img.naturalWidth === 0) {
      img.style.display = 'none';
      var fallbackContainer = img.nextElementSibling;
      if (fallbackContainer && fallbackContainer.classList.contains('photo-placeholder-fallback')) {
        fallbackContainer.style.display = 'flex';
      }
    }
  });

  // --- Section 3: Interactive Love Letter Envelope ---
  var envelopeWrapper = document.getElementById('envelope-wrapper');
  var envelope = document.getElementById('interactive-envelope');
  var openLetterPrompt = document.getElementById('open-letter-prompt');
  var letterModalBtn = document.getElementById('read-full-letter-btn');
  var letterModal = document.getElementById('letter-modal');
  var closeLetterModalBtn = document.getElementById('close-letter-modal');

  var isEnvelopeOpen = false;

  function toggleEnvelope() {
    isEnvelopeOpen = !isEnvelopeOpen;
    if (envelope) {
      envelope.classList.toggle('is-open', isEnvelopeOpen);
    }
    if (openLetterPrompt) {
      openLetterPrompt.textContent = isEnvelopeOpen ? 'Tap envelope to fold letter back 💌' : 'Tap the wax seal to unfold the letter... ✨';
    }

    // Trigger gentle heart burst on opening
    if (isEnvelopeOpen && window.burstHeartConfetti) {
      var rect = envelope.getBoundingClientRect();
      window.burstHeartConfetti(rect.left + rect.width / 2, rect.top + rect.height / 3);
    }
  }

  if (envelope) {
    envelope.addEventListener('click', function (e) {
      // If clicking inside the letter itself when open, don't close immediately if reading
      if (isEnvelopeOpen && e.target.closest('.letter-paper') && !e.target.closest('.wax-seal')) {
        return;
      }
      toggleEnvelope();
    });

    envelope.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEnvelope();
      }
    });
  }

  // Mobile Friendly Full Letter Modal
  if (letterModalBtn && letterModal) {
    letterModalBtn.addEventListener('click', function () {
      letterModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeLetterModalBtn && letterModal) {
    closeLetterModalBtn.addEventListener('click', function () {
      letterModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    letterModal.addEventListener('click', function (e) {
      if (e.target === letterModal) {
        letterModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Section 6: Final Surprise Reveal ---
  var finalSurpriseBtn = document.getElementById('final-surprise-btn');
  var finalRevealBox = document.getElementById('final-reveal-box');
  var sendLoveBtn = document.getElementById('send-love-btn');

  if (finalSurpriseBtn && finalRevealBox) {
    finalSurpriseBtn.addEventListener('click', function (e) {
      // Trigger romantic heart confetti explosion
      var rect = finalSurpriseBtn.getBoundingClientRect();
      if (window.burstHeartConfetti) {
        window.burstHeartConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      // Smoothly display reveal box
      finalRevealBox.classList.add('visible');
      finalRevealBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Morph button state
      finalSurpriseBtn.innerHTML = 'All my love, forever & always 💍';
      finalSurpriseBtn.disabled = true;
      finalSurpriseBtn.classList.add('revealed');
    });
  }

  if (sendLoveBtn) {
    sendLoveBtn.addEventListener('click', function (e) {
      var rect = sendLoveBtn.getBoundingClientRect();
      if (window.burstHeartConfetti) {
        window.burstHeartConfetti(rect.left + rect.width / 2, rect.top);
      }
      sendLoveBtn.classList.add('pulsing');
      setTimeout(function () {
        sendLoveBtn.classList.remove('pulsing');
      }, 600);
    });
  }

  // --- Scroll-Triggered Reveal Animations ---
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  // --- Floating Quick Actions (Audio widget toggle & Back to top) ---
  var backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
