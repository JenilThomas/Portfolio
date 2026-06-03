# 🌟 Premium Interactive Portfolio & CV Website

Welcome to your brand-new, highly customizable portfolio and CV website! 

This website has been custom-crafted using standard modern vanilla web technology (HTML5, CSS3, and ES6 JavaScript), built to deliver state-of-the-art interactive micro-animations, theme support, custom layouts, and perfect accessibility.

---

## 🛠️ Features Included

1. **Dual Themes (Dark & Light Mode)**:
   - Modern Obsidian dark layout & clean snow light layout.
   - Saves theme preference inside local storage (`localStorage`) and responds to system defaults.

2. **Premium Graphic Mockups**:
   - Cyberpunk abstract avatar tech profile photo.
   - High-fidelity SaaS dashboard mockup for web development.
   - Modern glass wallet interface mockup for mobile design.

3. **Interactive Cursor**:
   - Custom pointer overlay with rubber-band lagging effect.
   - Expands on hover triggers for links, buttons, and visual cards.

4. **Dynamic Hero Canvas Particles**:
   - Animated floating micro-particles.
   - Dynamic user mouse movement attraction & networking grid mapping lines.

5. **Typewriter Text Loop**:
   - Dynamic typing cycle displaying technical competencies.

6. **Stats Counters & Skill Loading Meters**:
   - Triggers counting up to target statistics dynamically when scrolled into view.
   - Skill loading indicators animate nicely across specific progress parameters when scrolled into view.

7. **Career CV Timeline (Journey Toggler)**:
   - Smoothly toggle between **Work Experience** and **Education**.
   - Pulse timeline trackers with interactive details.

8. **Filtered Project Grid with Overlay Lightbox Modals**:
   - Filter projects instantly by category: All, Full-Stack Dev, UI/UX & Design, and AI Solutions.
   - Expand details modals showing project contexts, calendars, client names, technical stacks utilized, and visit links.

9. **Glowing Feedback Form**:
   - Frosted glassmorphism design with floating label selectors.
   - Real-time validation checks with shake alerts on failures.
   - Simulates secure submission with nice loaders and a custom success screen dashboard saving leads details.

10. **CV Layout Printer Custom Styling**:
    - Includes `@media print` CSS configs to hide menu bars, interactive cards, and canvas tags.
    - Standardizes typography and elements, mapping a highly polished, clean layout designed specifically to print your CV cleanly to paper or PDF files.

---

## 🚀 How to Set as Workspace & Run

### 1. Set as Active Workspace
To open this project directly in your editor environment:
- Open your command panel (or IDE folders) and open `C:\Users\Jenil Thomas\.gemini\antigravity\scratch\portfolio-cv-website` as the active root directory.

### 2. View in Browser
You can open this website directly in your browser without any compilation!
- Simply open the `index.html` file in any modern browser (double click the file or right-click -> "Open With" -> Chrome/Firefox/Edge).
- Or run a lightweight local development server. For instance, if you have Python installed:
  ```powershell
  cd "C:\Users\Jenil Thomas\.gemini\antigravity\scratch\portfolio-cv-website"
  python -m http.server 8000
  ```
  Then open `http://localhost:8000` in your web browser.

---

## 📂 Project Structure

```text
portfolio-cv-website/
│
├── assets/
│   ├── avatar.png          # Generated abstract tech portrait
│   ├── project_web.png     # SaaS dashboard mockup
│   └── project_mobile.png  # Fintech mobile interface mockup
│
├── index.html              # Core semantic structure
├── style.css               # Theme configs, glassmorphic layout, print formats
├── script.js               # Canvas animations, typewriter, modals, validation
└── README.md               # User & setup instructions
```

---

## ✏️ Customizing to Your Profile

1. **Avatar / Image Mockups**:
   - Swap your profile photo by replacing `assets/avatar.png`.
   - Update project graphics by placing your own images inside the `assets/` folder and updating paths.

2. **Personal / Career Details**:
   - Simply open `index.html` and search for standard placeholder texts to easily swap descriptions, company names, degrees, and dates.
   - Update the portfolio database in `script.js` under `projectDatabase` to include your own projects!
