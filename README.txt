📦Template 3
---------------------- 
🛠️ Tech Stack:
    Tailwind CSS
    Express
    EJS
----------------------
🔥Setup (Install node_modules):
    npm install
----------------------
⚡How to start:
    npm run watch:css
    npm run start
----------------------    
📁 Folder Structure:
    📦
    ┣ 📂public                 - Static Files
    ┃ ┣ 📂css                      - CSS Files
    ┃ ┃ ┗ 📜styles.css                 - Tailwind output 
    ┃ ┣ 📂images                   - Images
    ┃ ┗ 📂js                       - Server side javascript
    ┣ 📂src                    - Source code
    ┃ ┣ 📂config                   - Config files
    ┃ ┃ ┗ 📜db.js                      - Database connection config
    ┃ ┣ 📂controllers              - Controllers
    ┃ ┣ 📂models                   - Models (Mongoose)
    ┃ ┣ 📂routes                   - Routes
    ┃ ┃ ┗ 📜indexRoutes.js             - "/" Router
    ┃ ┣ 📂utils                    - Utility sunctions
    ┃ ┣ 📜app.js                   - Main application setup
    ┃ ┗ 📜server.js                - Server initialization
    ┣ 📂styles                 - Global Style Imports
    ┃ ┗ 📜input.css                - Tailwind CSS input configuration
    ┣ 📂views                  - EJS template files
    ┃ ┣ 📂pages                    - Main page templates
    ┃ ┃ ┗ 📜home.ejs                   - Index Page
    ┃ ┗ 📂partials                 - Reusable template components
    ┣ 📜.env                   - Enviroment variable configuration
    ┣ 📜package-lock.json      - (Project dependencies and scripts)
    ┣ 📜package.json           - (Exact version of dependencies)
    ┣ 📜postcss.config.js      - PostCSS configuration (for Tailwind, Autoprefixer, ...)
    ┣ 📜README.txt             - This file
    ┗ 📜tailwind.config.js     - Tailwind CSS customization and configuration