# Vaasanthi Kolluru - Developer & Engineering Portfolio

A modern, responsive, high-performance portfolio website built with pure **HTML5, CSS3, and modern Vanilla JavaScript (ES6+)**, tailored specifically for instant deployment to **GitHub Pages**.

This portfolio reflects the academic and technical profile of **Vaasanthi Kolluru**, Electronics and Communication Engineering undergraduate at VFSTR (Expected 2027), balancing software development competencies (Python, SQL, OOPs, Web Development) with core engineering innovations (Arduino Laser Communication and Terahertz Metamaterials).

---

## 🚀 Key Features

- **GitHub Pages Ready**: 100% static client-side architecture with zero build tools (`npm`, `webpack`, `vite`, etc.) required. All asset paths are relative.
- **Dynamic Theming**: Instant Dark Mode / Light Mode toggle with automatic `localStorage` preference persistence and OS-level (`prefers-color-scheme`) detection.
- **Interactive Laser Morse Code Simulator**:
  - Live encoding of user input into Morse code.
  - Synchronized visual pulsing of a virtual red laser diode.
  - Synthesized audio beeps using the browser's native **Web Audio API** (700Hz sine wave tone generator) with mute controls.
- **Dynamic Skill Filtering**: Tab-based interactive category switcher (`All`, `Programming & Web`, `Core CS & Database`, `Engineering & Tools`, `Professional & Soft Skills`).
- **Interactive Project Modals**: Deep-dive modals presenting problem statements, architectural block diagrams, quantifiable metrics, and tech stacks.
- **Full Resume Synchronization**: Accurately mirrors all credentials, including:
  - **Education**: VFSTR B.Tech (CGPA 7.3), Sri Chaitanya Junior College (89.5%), Sri Venkateswara Bala Kutter (CGPA 9.8).
  - **Certifications**: Cisco Python Essentials 1 & 2, Cognizant Agentic AI / Prompt Engineering / Agile, MSME Technology, Cambridge English (Score: 150).
  - **Leadership**: ISRO Space Summit Technical Presenter (Chandrayaan Mission) & Event Coordinator for Guest Lectures.
- **Standalone Printable Resume**: Accessible via `./assets/resume.html`, formatted cleanly for browser printing or direct "Save as PDF".
- **Contact Integration**: Validated message composer with auto-launch mailto generator and one-click clipboard copy buttons for email and phone.

---

## 📁 Project Structure

```plaintext
vaasanthi-portfolio/
│
├── index.html              # Main single-page portfolio layout
├── README.md               # Documentation and GitHub Pages deployment guide
│
├── css/
│   └── style.css           # Custom CSS variables, themes, animations, and responsive media queries
│
├── js/
│   └── main.js             # Theme switcher, typing animation, modals, filters, and Morse simulator
│
└── assets/
    └── resume.html         # Clean, printable, PDF-ready resume page
```

---

## 🌐 How to Deploy to GitHub Pages

Deploying this portfolio to GitHub Pages takes less than 2 minutes and is completely free.

### Option A: Personal User Site (`https://<your-username>.github.io`)

1. **Create a new GitHub Repository**:
   - Repository name: `<your-username>.github.io` (replace `<your-username>` with your exact GitHub username).
   - Visibility: **Public**.

2. **Upload or Push the files**:
   ```bash
   cd vaasanthi-portfolio
   git init
   git add .
   git commit -m "Initial commit: Vaasanthi Kolluru Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```

3. **View your site**:
   - Navigate to `https://<your-username>.github.io` in your browser. It will be live automatically!

---

### Option B: Project Site (`https://<your-username>.github.io/portfolio`)

1. **Create a GitHub Repository**:
   - Repository name: `portfolio` (or any custom name).
   - Visibility: **Public**.

2. **Push the files**:
   ```bash
   cd vaasanthi-portfolio
   git init
   git add .
   git commit -m "Add portfolio files"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** (top navigation tab).
   - On the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
   - Within 1–2 minutes, GitHub will generate your live URL:
     `https://<your-username>.github.io/portfolio/`

---

## 🛠️ Local Development & Testing

You can preview the portfolio locally without installing any tools:

1. Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.
2. Alternatively, use any lightweight local web server:
   - **VS Code Live Server**: Right click `index.html` &rarr; `Open with Live Server`.
   - **Python**: `python -m http.server 8000` (then visit `http://localhost:8000`).

---

## 📄 License & Attribution

Designed and developed for **Vaasanthi Kolluru**. Open for personal portfolio customization and deployment.
