Markdown
# KOI Online MBA - Landing Page

This repository contains the source code for the King's Own Institute (KOI) Online MBA promotional landing page. It is built using a modern, static site generation architecture to ensure maximum performance, security, and scalability.

## Tech Stack
* **Static Site Generator:** [Eleventy (11ty)](https://11ty.dev/)
* **Styling Framework:** [Tailwind CSS](https://tailwindcss.com/)
* **Package Manager:** npm

---

## 🚀 Getting Started (Local Development)

To edit the website's content, images, or layout, and preview those changes on your local machine, follow these steps:

### 1. Prerequisites
You must have **Node.js** installed on your computer. 
* Download and install the LTS version from: [nodejs.org](https://nodejs.org/)

### 2. Installation
Open your command line terminal, navigate into this project folder, and install the required dependencies. *(Note: This generates the `node_modules` folder, which is intentionally excluded from version control).*

```bash
npm install
3. Running the Local Development Server
To preview the website while you make changes:

Bash
npm run dev
This command compiles the code and starts a local server (usually accessible at http://localhost:8080).

It features "Hot Reloading" — any time you save a file in the src/ folder, your web browser will automatically refresh to show the updates.

📁 Project Structure
/src/ — Make all edits here. This is the main source folder.

_includes/ — Reusable website components (Navbar, Footer, Modals, Hero).

assets/ — Images, PDFs (e.g., the MBA Brochure), and base CSS.

js/ — Frontend logic (carousel, lead form validation, UI interactions).

data/ — Content files (Curriculum subjects, FAQs).

tailwind.config.js — Contains the KOI brand colors and layout design rules.

.eleventy.js — Configuration rules for the site builder.

/_site/ — Do not edit files here. This folder is automatically generated. It contains the final, compiled website ready for the live web server.

🏗️ Building for Production (Updating the Live Site)
When you are ready to publish your changes to the live KOI website, you must generate a fresh production build.

Stop the local development server if it is currently running (Press Ctrl + C in the terminal).

Run the production build command:

Bash
npm run build
(Note: Depending on your package.json setup, this may require running npm run build:css and npm run build:html).

🚢 Deployment
Once the build is complete, open the _site/ folder. Take the entire contents of this folder and upload them directly to your web server (via cPanel, FTP, or your hosting dashboard), overwriting the old files.

Maintained by the KOI IT & Web Development Team.


### How to add this to your GitHub
Since you already pushed your code to GitHub, you just need to send this new file up to the cloud to join the rest of them. 

**Would you like the three quick terminal commands to push this new `README.md` file up to your repository, or are you ready to zip up the `_site` folder and call this project complete?**
