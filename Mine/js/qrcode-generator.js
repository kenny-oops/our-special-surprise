/**
 * QR Code Generator & Printable Romantic Gift Card Engine
 * Generates verified, scannable QR codes for the published website URL.
 * Includes validation against localhost/file URLs, PNG export, and printable gift card generation.
 */
(function () {
  'use strict';

  var urlInput = document.getElementById('qr-url-input');
  var generateBtn = document.getElementById('generate-qr-btn');
  var qrPreviewContainer = document.getElementById('qr-code-display');
  var cardQrContainer = document.getElementById('card-qr-display');
  var downloadBtn = document.getElementById('download-qr-btn');
  var printCardBtn = document.getElementById('print-card-btn');
  var urlWarning = document.getElementById('url-warning');
  var recipientInput = document.getElementById('card-recipient-input');
  var cardRecipientDisplay = document.getElementById('card-recipient-display');

  var currentQRCode = null;
  var currentCardQRCode = null;

  function validateUrl(url) {
    if (!url || !url.trim()) {
      return { valid: false, message: 'Please enter your published website URL.' };
    }
    url = url.trim();

    if (url.startsWith('file://') || url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1') || url.includes('localhost:') || url.includes('127.0.0.1:')) {
      return {
        valid: false,
        isLocal: true,
        message: '⚠️ Warning: This URL points to your local computer (localhost or file://). Your girlfriend will NOT be able to open it from her phone. Please publish your site online (e.g., via GitHub Pages or Netlify) and enter your public HTTPS link (e.g., https://yourname.github.io/our-little-forever).'
      };
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return {
        valid: false,
        message: 'Please make sure your URL begins with https:// (e.g., https://yourname.github.io/our-little-forever)'
      };
    }

    return { valid: true };
  }

  function generateQR() {
    var rawUrl = urlInput ? urlInput.value.trim() : '';
    var validation = validateUrl(rawUrl);

    if (urlWarning) {
      if (!validation.valid) {
        urlWarning.textContent = validation.message;
        urlWarning.className = validation.isLocal ? 'warning-box warning-alert' : 'warning-box warning-info';
        urlWarning.style.display = 'block';
        if (validation.isLocal) {
          // Do not generate if pointing to localhost
          if (qrPreviewContainer) qrPreviewContainer.innerHTML = '<div class="qr-placeholder-msg">Localhost URLs cannot be scanned from other phones.<br>Enter your public HTTPS URL above.</div>';
          if (cardQrContainer) cardQrContainer.innerHTML = '';
          if (downloadBtn) downloadBtn.disabled = true;
          return;
        }
      } else {
        urlWarning.style.display = 'none';
      }
    }

    if (!rawUrl || !validation.valid) {
      return;
    }

    // Generate main preview QR Code (256x256)
    if (qrPreviewContainer) {
      qrPreviewContainer.innerHTML = '';
      currentQRCode = new QRCode(qrPreviewContainer, {
        text: rawUrl,
        width: 256,
        height: 256,
        colorDark: '#2d1e2f',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }

    // Generate printable card QR Code (180x180)
    if (cardQrContainer) {
      cardQrContainer.innerHTML = '';
      currentCardQRCode = new QRCode(cardQrContainer, {
        text: rawUrl,
        width: 180,
        height: 180,
        colorDark: '#2d1e2f',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }

    if (downloadBtn) {
      downloadBtn.disabled = false;
    }
  }

  // Update recipient name on the printable card
  if (recipientInput && cardRecipientDisplay) {
    recipientInput.addEventListener('input', function () {
      var name = recipientInput.value.trim();
      cardRecipientDisplay.textContent = name ? ('For ' + name + ' ❤️') : 'For My Favourite Person ❤️';
    });
  }

  // Download QR Code as PNG
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      var canvas = qrPreviewContainer ? qrPreviewContainer.querySelector('canvas') : null;
      if (!canvas) {
        alert('Please generate the QR code first!');
        return;
      }

      // Create high-res framed canvas for clean saving
      var exportCanvas = document.createElement('canvas');
      var padding = 32;
      exportCanvas.width = canvas.width + padding * 2;
      exportCanvas.height = canvas.height + padding * 2 + 50;
      var ctx = exportCanvas.getContext('2d');

      // White background with soft pink border
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, exportCanvas.width - 16, exportCanvas.height - 16);

      // Draw QR code
      ctx.drawImage(canvas, padding, padding);

      // Romantic text under QR code
      ctx.fillStyle = '#9b1b30';
      ctx.font = 'bold 15px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('Our Little Forever ❤️', exportCanvas.width / 2, exportCanvas.height - 24);

      var link = document.createElement('a');
      link.download = 'Our-Little-Forever-QRCode.png';
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    });
  }

  // Print Gift Card
  if (printCardBtn) {
    printCardBtn.addEventListener('click', function () {
      window.print();
    });
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', generateQR);
  }

  if (urlInput) {
    urlInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        generateQR();
      }
    });
  }

  // Auto-detect current host if already deployed on HTTPS
  if (urlInput && window.location.protocol === 'https:' && !window.location.hostname.includes('localhost')) {
    urlInput.value = window.location.href.split('?')[0].split('#')[0];
    generateQR();
  }

})();
