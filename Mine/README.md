# Our Little Forever ❤️
> A beautiful, premium, fully responsive romantic surprise website created as a digital love letter and QR-code gift for your girlfriend.

---

## 🌟 Overview & Features

- **Section 1 — Personal Welcome:** Beating 3D heart with soft glow, heartfelt greeting (*"Hey, my favourite person... ❤️"*), and *"Open Your Surprise 💌"* smooth scroll CTA.
- **Section 2 — Her Photograph:** Polaroid-style memory frame with realistic washi-tape detail, 3D hover tilt, handwritten caption (*"To the girl who makes my world more beautiful."*), and graceful fallback placeholder.
- **Section 3 — My Love Letter:** Interactive animated envelope with ruby-and-gold wax seal. Tapping the seal opens the envelope flap in 3D and unfolds the parchment letter. Includes full-screen mobile view.
- **Section 4 — Our Memories:** Three elegant glassmorphic cards for:
  1. *Our favourite memory*
  2. *The moment you made me smile*
  3. *A dream I want us to achieve together*
- **Section 5 — A Special Promise:** Glowing vow card featuring your promise and *"You mean the world to me ❤️"*.
- **Section 6 — Final Surprise:** Cinematic message with an interactive *"One last thing... 💖"* button that triggers an explosion of floating heart confetti and reveals the secret final message.
- **Section 7 — Background Music:** Ambient audio player with a rotating vinyl disc, play/pause controls, mute toggle, soundwave bars, and an automatic Web Audio synthesized music-box chime fallback if no MP3 has been added yet.
- **Section 8 — QR Code & Printable Gift Card Studio (`qrcode.html`):**
  - Generates a real, scannable QR code for your live published HTTPS website URL.
  - Warns against localhost/file links to ensure her phone can open it anywhere.
  - High-resolution PNG download button.
  - Print-ready romantic gift card with custom recipient name and cut-lines.

---

## 📁 Project Folder Structure

```text
our-little-forever/
├── index.html                 # Main romantic website (Sections 1–7)
├── qrcode.html                # QR code generator & printable card studio (Section 8)
├── README.md                  # Beginner-friendly setup & deployment guide
├── css/
│   ├── style.css              # Romantic theme, glassmorphism, responsive styles
│   ├── envelope.css           # Interactive 3D envelope & unfolding letter animations
│   └── qrcode.css             # QR studio & printable gift card styles (@media print)
├── js/
│   ├── main.js                # Smooth scrolling, image fallbacks, envelope & reveal logic
│   ├── particles.js           # Interactive floating hearts & fairy dust background canvas
│   ├── music.js               # Audio playback controller & synthesized chime fallback
│   ├── qrcode-lib.js          # Self-contained offline QR code generator (Model 2)
│   └── qrcode-generator.js    # QR generation, validation, PNG export, and printing
└── assets/
    ├── girlfriend.jpg         # Her photograph (place your girlfriend's photo here)
    ├── girlfriend.svg         # Default vector placeholder if girlfriend.jpg is missing
    ├── memory1.jpg            # Photo for Memory Card 1
    ├── memory1.svg            # Default placeholder for Memory Card 1
    ├── memory2.jpg            # Photo for Memory Card 2
    ├── memory2.svg            # Default placeholder for Memory Card 2
    ├── memory3.jpg            # Photo for Memory Card 3
    ├── memory3.svg            # Default placeholder for Memory Card 3
    └── music.mp3              # (Optional) Your romantic instrumental soundtrack
```

---

## 🎨 How to Personalize the Website

### 1. Adding Her Photograph
1. Choose a clear, lovely photo of your girlfriend.
2. Rename the image file to:
   ```text
   girlfriend.jpg
   ```
3. Copy or move `girlfriend.jpg` directly into the `assets/` folder, replacing the placeholder.
4. *Tip:* Any standard portrait or square photo works great. The Polaroid frame automatically crops and centers the photo.

### 2. Replacing Memory Photos & Descriptions
1. In the `assets/` folder, replace:
   - `memory1.jpg` &rarr; Your favourite memory photo.
   - `memory2.jpg` &rarr; A photo of her smiling or laughing.
   - `memory3.jpg` &rarr; A photo representing your future dream or travel.
2. Open `index.html` in any text editor (VS Code, Notepad, etc.) and search for `SECTION 4 — OUR MEMORIES`.
3. Edit the descriptions between the `<p class="memory-desc">` tags to tell your personal memories.

### 3. Personalizing the Love Letter
1. Open `index.html` and search for `SECTION 3 — MY LOVE LETTER`.
2. Look for `<div class="letter-body-text">`.
3. You can edit any sentences, add pet names, or mention personal inside jokes.
4. The letter appears in two places in `index.html`:
   - Inside the interactive envelope (`.envelope-wrapper .letter-full-content`)
   - Inside the mobile modal (`#letter-modal`)
   Be sure to update both so they match!

### 4. Adding Your Own Romantic Music
1. Have a romantic instrumental song or your special song in `.mp3` format.
2. Rename the audio file to `music.mp3`.
3. Place it inside the `assets/` folder as `assets/music.mp3`.
4. *Note:* If you don't add an MP3, tapping Play automatically plays a gentle synthesized lullaby music-box melody!

---

## 💻 How to Test Locally on Your Computer

You can test the website immediately on your computer before uploading:

### Option A (Double Click):
Simply double-click `index.html` to open it in your browser (Google Chrome, Safari, Microsoft Edge, Firefox).

### Option B (Local Dev Server via Node.js):
If you have Node.js installed, open terminal in the project folder and run:
```bash
npx serve .
```
or with Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🚀 How to Publish Online for Free (Step-by-Step)

To give her a QR code that works on her phone, the website must be published to a public HTTPS web address. Here are the 2 easiest free methods:

### Method 1: Netlify Drop (Easiest — Takes 30 Seconds, No Coding Required)
1. Visit **[https://app.netlify.com/drop](https://app.netlify.com/drop)** in your web browser.
2. Drag and drop the `our-little-forever` project folder into the upload circle on the webpage.
3. Netlify will deploy your site in seconds and give you a free public HTTPS address (e.g. `https://peaceful-sweet-12345.netlify.app`).
4. (Optional) In Netlify site settings, you can change the site name to something sweet like `https://our-little-forever.netlify.app`.

### Method 2: GitHub Pages (Free Forever)
1. Create a free account at **[github.com](https://github.com)**.
2. Create a new public repository named `our-little-forever`.
3. Upload all the files and folders from this project into the repository.
4. In your GitHub repository, click **Settings** &rarr; **Pages** (on the left menu).
5. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
6. Wait 1–2 minutes, and GitHub will provide your live URL:
   ```text
   https://<your-username>.github.io/our-little-forever/
   ```

---

## 📱 Generating & Printing the QR Gift Card

Once your website is live online:

1. Open `qrcode.html` (either locally or on your published site at `/qrcode.html`).
2. Paste your live HTTPS address (e.g., `https://yourname.github.io/our-little-forever/`) into the input box.
3. (Optional) Type her name in the recipient name box.
4. Click **"Generate Scannable QR Code ✨"**.
5. Test it by scanning the screen with your own phone camera to confirm it opens the live website!
6. Click **"Download QR (PNG)"** to save the image, or click **"Print Gift Card (PDF)"** to print the romantic gift card.
7. Print it on photo paper or cardstock, cut along the border, and place it in an envelope, inside a box of chocolates, or tied to a bouquet of flowers! ❤️

---

## 🔒 Privacy & Safety Notice

- **No login required:** She can open the site instantly without entering any password or registering.
- **Zero tracking or ads:** 100% private and romantic.
- **Self-contained:** The QR code generation runs entirely in the browser using the included `js/qrcode-lib.js` without sending your URL to third-party tracking APIs.
