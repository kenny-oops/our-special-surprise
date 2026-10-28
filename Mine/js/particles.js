/**
 * Floating Heart Particles & Romantic Fairy Sparkles Engine
 * Creates a dreamy, ambient background with interactive burst effects.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('heart-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'heart-canvas';
    document.body.prepend(canvas);
  }
  var ctx = canvas.getContext('2d');

  var width = window.innerWidth;
  var height = window.innerHeight;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  var particles = [];
  var sparkles = [];
  var confetti = [];

  var romanticColors = [
    'rgba(244, 114, 182, 0.65)', // rose pink
    'rgba(251, 113, 133, 0.60)', // coral rose
    'rgba(248, 187, 208, 0.70)', // soft blush
    'rgba(225, 29, 72, 0.50)',   // subtle red
    'rgba(253, 224, 71, 0.55)',  // champagne gold
    'rgba(244, 63, 94, 0.55)'    // bright romantic rose
  ];

  // Helper to draw a heart path
  function drawHeart(c, x, y, size, rotation) {
    c.save();
    c.translate(x, y);
    c.rotate(rotation);
    c.beginPath();
    var topCurveHeight = size * 0.3;
    c.moveTo(0, topCurveHeight);
    // top left curve
    c.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
    // top right curve
    c.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
    c.closePath();
    c.fill();
    c.restore();
  }

  // Heart particle class for ambient background
  function HeartParticle() {
    this.reset();
    this.y = Math.random() * height; // initial spread
  }

  HeartParticle.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = height + 20 + Math.random() * 50;
    this.size = 8 + Math.random() * 16;
    this.speedY = 0.4 + Math.random() * 0.9;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.swaySpeed = 0.01 + Math.random() * 0.02;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.swayDistance = 15 + Math.random() * 30;
    this.baseX = this.x;
    this.rotation = (Math.random() - 0.5) * 0.4;
    this.color = romanticColors[Math.floor(Math.random() * romanticColors.length)];
    this.opacity = 0.2 + Math.random() * 0.6;
  };

  HeartParticle.prototype.update = function () {
    this.y -= this.speedY;
    this.swayOffset += this.swaySpeed;
    this.x = this.baseX + Math.sin(this.swayOffset) * this.swayDistance;
    this.rotation += Math.sin(this.swayOffset) * 0.005;

    if (this.y < -30) {
      this.reset();
    }
  };

  HeartParticle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    drawHeart(ctx, this.x, this.y, this.size, this.rotation);
    ctx.restore();
  };

  // Sparkle / fairy dust particle class
  function SparkleParticle() {
    this.reset();
  }

  SparkleParticle.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = 1 + Math.random() * 2.5;
    this.alpha = Math.random();
    this.alphaSpeed = 0.01 + Math.random() * 0.02;
    this.color = (Math.random() > 0.4) ? '#ffd1dc' : '#fff9db';
  };

  SparkleParticle.prototype.update = function () {
    this.alpha += this.alphaSpeed;
    if (this.alpha > 1 || this.alpha < 0) {
      this.alphaSpeed = -this.alphaSpeed;
    }
  };

  SparkleParticle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha * 0.8));
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Click & Confetti Heart Burst Particle
  function BurstHeart(x, y, isSpecial) {
    this.x = x;
    this.y = y;
    var angle = Math.random() * Math.PI * 2;
    var speed = isSpecial ? (3 + Math.random() * 8) : (1.5 + Math.random() * 4);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - (isSpecial ? 2 : 1);
    this.size = isSpecial ? (10 + Math.random() * 20) : (8 + Math.random() * 12);
    this.rotation = Math.random() * Math.PI * 2;
    this.vRot = (Math.random() - 0.5) * 0.1;
    this.gravity = 0.08;
    this.color = romanticColors[Math.floor(Math.random() * romanticColors.length)];
    this.alpha = 1;
    this.fade = isSpecial ? (0.008 + Math.random() * 0.012) : (0.015 + Math.random() * 0.02);
  }

  BurstHeart.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.rotation += this.vRot;
    this.alpha -= this.fade;
  };

  BurstHeart.prototype.draw = function () {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    drawHeart(ctx, this.x, this.y, this.size, this.rotation);
    ctx.restore();
  };

  // Initialize pool of ambient particles (scaled by screen width)
  var heartCount = Math.min(35, Math.max(16, Math.floor(width / 35)));
  var sparkleCount = Math.min(45, Math.max(20, Math.floor(width / 30)));

  for (var i = 0; i < heartCount; i++) {
    particles.push(new HeartParticle());
  }
  for (var j = 0; j < sparkleCount; j++) {
    sparkles.push(new SparkleParticle());
  }

  // Animation Loop
  var isTabActive = true;
  document.addEventListener('visibilitychange', function () {
    isTabActive = !document.hidden;
  });

  function animate() {
    if (isTabActive) {
      ctx.clearRect(0, 0, width, height);

      // Draw fairy sparkles
      for (var s = 0; s < sparkles.length; s++) {
        sparkles[s].update();
        sparkles[s].draw();
      }

      // Draw floating ambient hearts
      for (var p = 0; p < particles.length; p++) {
        particles[p].update();
        particles[p].draw();
      }

      // Draw active burst particles
      for (var c = confetti.length - 1; c >= 0; c--) {
        confetti[c].update();
        confetti[c].draw();
        if (confetti[c].alpha <= 0) {
          confetti.splice(c, 1);
        }
      }
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Interactive tap / click anywhere creates a gentle burst of hearts
  function triggerBurst(x, y, count, isSpecial) {
    count = count || 6;
    for (var i = 0; i < count; i++) {
      confetti.push(new BurstHeart(x, y, isSpecial));
    }
  }

  window.addEventListener('pointerdown', function (e) {
    // Avoid interfering with form inputs or buttons that have their own feedback
    var targetTag = e.target.tagName.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea') return;
    triggerBurst(e.clientX, e.clientY, 5, false);
  });

  // Global function for the special final surprise explosion
  window.burstHeartConfetti = function (centerX, centerY) {
    var x = centerX || (width / 2);
    var y = centerY || (height / 2);
    for (var i = 0; i < 60; i++) {
      setTimeout(function () {
        triggerBurst(x + (Math.random() - 0.5) * 120, y + (Math.random() - 0.5) * 80, 2, true);
      }, i * 25);
    }
  };

})();
