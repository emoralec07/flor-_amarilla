window.addEventListener('DOMContentLoaded', function () {
  var doc = document, flower = doc.querySelector('.flower');
  var maxParts = 20, maxPetals = 6;
  var partsFontStep = 25 / maxParts;

  createFlower();

  function createFlower() {
    var angle = 360 / maxPetals;
    for (var i = 0; i < maxPetals; i++) {
      var petal = createPetal();
      var currAngle = angle * i + 'deg';
      petal.setAttribute('style', 'transform: rotateY(' + currAngle + ') rotateX(-30deg) translateZ(9vmin)');
      flower.appendChild(petal);
    }
  }

  function createPetal() {
    var box = createBox(null, 0);
    var petal = doc.createElement('div');
    petal.classList.add('petal');
    for (var i = 1; i <= maxParts; i++) box = createBox(box, i);
    petal.appendChild(box);
    return petal;
  }

  function createBox(box, pos) {
    var fontSize = partsFontStep * (maxParts - pos) + 'vmin';
    var half = maxParts / 2;
    var bright = 55;
    if (pos < half + 1) {
      fontSize = partsFontStep * pos + 'vmin';
    } else {
      bright = 22 + 45 / half * (maxParts - pos);
    }
    var baseHue = 42;
    var hueVariation = 8;
    var saturation = 78 + (18 * pos / maxParts);
    var color = 'hsl(' + (baseHue + (hueVariation * pos / maxParts)) + ', ' + saturation + '%, ' + bright + '%)';

    var newShape = doc.createElement('div');
    newShape.classList.add('shape');
    var newBox = doc.createElement('div');
    newBox.classList.add('box');
    newBox.setAttribute('style', 'color: ' + color + ';font-size: ' + fontSize);
    if (box) newBox.appendChild(box);
    newBox.appendChild(newShape);
    return newBox;
  }

  function drawGalaxy() {
    var canvas = document.getElementById('galaxy-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    var stars = [], numStars = 400;
    for (var i = 0; i < numStars; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + 0.5, dx: (Math.random() - 0.5) * 0.7, dy: (Math.random() - 0.5) * 0.7, alpha: Math.random() * 0.5 + 0.5 });
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(246,196,69,0.9)';
        ctx.shadowColor = '#F6C445';
        ctx.shadowBlur = 2;
        ctx.fill();
        ctx.restore();
        s.x += s.dx; s.y += s.dy;
        if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
  drawGalaxy();

  var mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.style.display = '';

  var startBtn = document.getElementById('start-btn');
  var btnText = 'Ábreme';
  startBtn.textContent = '';
  startBtn.disabled = true;
  var iBtn = 0;
  function typeBtn() {
    if (iBtn < btnText.length) {
      startBtn.textContent += btnText.charAt(iBtn);
      iBtn++;
      setTimeout(typeBtn, 90);
    } else {
      startBtn.disabled = false;
    }
  }
  typeBtn();

  var wrapper = document.querySelector('.wrapper');
  var container = document.getElementById('start-btn-container');

  // mensaje que va tapado, para raspar
  var finalMessage = `🌻 Te regalo esta flor amarilla por este 21 de septiembre.

Va con mucho cariño y con la intención de sacarte una pequeña sonrisa. 💛

Espero que tengas un bonito día y que nunca te falten motivos para sonreír. ✨`;

  //  mensaje secreto del centro de la flor
  var secretMessage = `Encontraste el mensaje secreto 🌟💛💛🌻🌻
  Este es un mensaje extra solo para ti.

  Quizás esta flor amarilla sea solo un pequeño detalle, pero detrás de ella hay algo 
  que no se puede envolver ni regalar de ninguna otra forma: 
  las ganas de verte sonreír. 💛

  Y si te preguntas por qué tú... bueno, digamos que hay personas que, sin darse cuenta,
  se vuelven un poquito más especiales de lo que uno tenía pensado. 🌻✨`;

  function spawnConfetti() {
    var confettiContainer = document.getElementById('confetti-container');
    var colors = ['#F6C445', '#FFF3CC', '#E8871E', '#93A863'];
    for (var i = 0; i < 40; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = (Math.random() * 100) + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2 + Math.random() * 1.5) + 's';
      piece.style.animationDelay = (Math.random() * 0.4) + 's';
      confettiContainer.appendChild(piece);
      (function (el) {
        el.addEventListener('animationend', function () { el.remove(); });
      })(piece);
    }
  }

  function showSecretMessage() {
    var wrap = document.getElementById('secret-msg-wrap');
    var textEl = document.getElementById('secret-msg-text');
    textEl.textContent = secretMessage;
    wrap.style.display = 'block';
    requestAnimationFrame(function () { wrap.classList.add('show'); });
    spawnConfetti();
  }

  document.getElementById('secret-msg-close').addEventListener('click', function () {
    var wrap = document.getElementById('secret-msg-wrap');
    wrap.classList.remove('show');
    setTimeout(function () { wrap.style.display = 'none'; }, 400);
  });

  document.getElementById('secret-center').addEventListener('click', function (e) {
    e.stopPropagation();
    showSecretMessage();
  });

  startBtn.addEventListener('click', function () {
    var isMobile = window.innerWidth <= 600;
    container.style.display = 'none';
    wrapper.style.display = '';

    var music = document.getElementById('bg-music');
    if (music && music.getAttribute('src')) {
      music.currentTime = 0;
      var playPromise = music.play();
      if (playPromise !== undefined) playPromise.catch(function () {});
    }

    setTimeout(function () {
      var galaxyCanvas = document.getElementById('galaxy-canvas');
      galaxyCanvas.style.display = '';
      galaxyCanvas.width = window.innerWidth;
      galaxyCanvas.height = window.innerHeight;
      var ctx = galaxyCanvas.getContext('2d');
      var numDots = isMobile ? 30 : 70;
      var dots = [];
      var dotsToAdd = 0;
      var minDotSize = isMobile ? 0.6 : 0.8;
      var maxDotSize = isMobile ? 1.3 : 1.9;

      function addDot() {
        if (dotsToAdd < numDots) {
          var angle = Math.random() * 2 * Math.PI;
          var radius = Math.random() * (galaxyCanvas.width / 2.2);
          var x = galaxyCanvas.width / 2 + Math.cos(angle) * radius;
          var y = galaxyCanvas.height / 2 + Math.sin(angle) * radius;
          var speed = 0.2 + Math.random() * 0.7;
          var dir = Math.random() * 2 * Math.PI;
          var dotSize = minDotSize + Math.random() * (maxDotSize - minDotSize);
          dots.push({ x: x, y: y, r: dotSize, dx: Math.cos(dir) * speed, dy: Math.sin(dir) * speed, alpha: 0.5 + Math.random() * 0.5 });
          dotsToAdd++;
          setTimeout(addDot, 10);
        }
      }
      addDot();

      function animateGalaxy() {
        ctx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
        var hue = 42;
        for (var i = 0; i < dots.length; i++) {
          var dot = dots[i];
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
          ctx.fillStyle = 'hsla(' + hue + ', 85%, 65%, ' + dot.alpha + ')';
          ctx.shadowColor = 'hsla(' + hue + ',85%,65%,0.6)';
          ctx.shadowBlur = 1;
          ctx.fill();
          dot.x += dot.dx;
          dot.y += dot.dy;
          if (dot.x < 0) dot.x = galaxyCanvas.width;
          if (dot.x > galaxyCanvas.width) dot.x = 0;
          if (dot.y < 0) dot.y = galaxyCanvas.height;
          if (dot.y > galaxyCanvas.height) dot.y = 0;
        }
        requestAnimationFrame(animateGalaxy);
      }
      setTimeout(function () { galaxyCanvas.style.opacity = '1'; }, 50);
      animateGalaxy();

      function animateFlowerShape() {
        var cx = galaxyCanvas.width / 2;
        var cy = galaxyCanvas.height * 0.6;
        var size = Math.min(galaxyCanvas.width, galaxyCanvas.height) / 5.5;
        var petals = 5;
        var targets = [];
        for (var i = 0; i < dots.length; i++) {
          var t = Math.PI * 2 * (i / dots.length);
          var r = size * Math.cos(petals * t);
          var x = cx + r * Math.cos(t);
          var y = cy + r * Math.sin(t);
          targets.push({ x: x, y: y });
        }
        var steps = 16, step = 0;
        function moveDots() {
          for (var i = 0; i < dots.length; i++) {
            var dot = dots[i], target = targets[i];
            dot.x += (target.x - dot.x) / (steps - step + 1);
            dot.y += (target.y - dot.y) / (steps - step + 1);
          }
          step++;
          if (step < steps) requestAnimationFrame(moveDots);
        }
        moveDots();
      }

      function revealFinalMessage(text) {
        var wrap = document.getElementById('scratch-wrap');
        var textEl = document.getElementById('scratch-text');
        var canvas = document.getElementById('scratch-canvas');
        var closeBtn = document.getElementById('scratch-close');
        var sctx = canvas.getContext('2d');

        textEl.textContent = text;
        wrap.style.display = 'block';
        closeBtn.style.display = 'none';

        var rect = wrap.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        canvas.style.opacity = '1';

        var grad = sctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#F6C445');
        grad.addColorStop(0.5, '#FFF3CC');
        grad.addColorStop(1, '#E8871E');
        sctx.fillStyle = grad;
        sctx.fillRect(0, 0, canvas.width, canvas.height);

        sctx.fillStyle = 'rgba(51,48,31,0.75)';
        sctx.font = 'bold ' + (canvas.height * 0.14) + 'px Inter, sans-serif';
        sctx.textAlign = 'center';
        sctx.textBaseline = 'middle';
        sctx.fillText('✨ Rasca aquí ✨', canvas.width / 2, canvas.height / 2);

        var isScratching = false, revealed = false;

        function scratchAt(x, y) {
          sctx.globalCompositeOperation = 'destination-out';
          sctx.beginPath();
          sctx.arc(x, y, canvas.height * 0.18, 0, Math.PI * 2);
          sctx.fill();
        }
        function getPos(e) {
          var r = canvas.getBoundingClientRect();
          return { x: e.clientX - r.left, y: e.clientY - r.top };
        }
        function checkRevealed() {
          var data = sctx.getImageData(0, 0, canvas.width, canvas.height).data;
          var cleared = 0, total = data.length / 4;
          for (var i = 3; i < data.length; i += 4) { if (data[i] === 0) cleared++; }
          if (cleared / total > 0.5 && !revealed) {
            revealed = true;
            canvas.style.transition = 'opacity 0.6s ease';
            canvas.style.opacity = '0';
            closeBtn.style.display = 'block';
          }
        }

        canvas.addEventListener('pointerdown', function (e) { isScratching = true; var p = getPos(e); scratchAt(p.x, p.y); });
        canvas.addEventListener('pointermove', function (e) { if (!isScratching) return; var p = getPos(e); scratchAt(p.x, p.y); checkRevealed(); });
        window.addEventListener('pointerup', function () { isScratching = false; checkRevealed(); });

        closeBtn.onclick = function () {
          wrap.style.display = 'none';
          animateFlowerShape();
          document.getElementById('secret-center').classList.add('active');
        };
      }

      revealFinalMessage(finalMessage);
    }, 2000);
  });
});
