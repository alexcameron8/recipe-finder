# 🍰 MyRecipeSeeker 🍝

## Overview ❓

The intended goal of this project is to develop a tool that can make day to day life easier for individuals who struggle with dietary restrictions or allergies (such as myself!) for meal planning.

### Deployment Status ⚡
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fwww.myrecipeseeker.com)](https://www.myrecipeseeker.com)

### Problem Statement 🧩
Develop a robust and user-friendly Recipe Seeker application to enhance collaboration and discovery of new recipes.
### Solution 💡
--
### Technologies Used 💻

Front end: React.js, TailwindcssCSS, NextUI Component Library
Back end: Express.js, Node
Database: MongoDB

### Architecture 🏗

- Utilizes Edamam API for recipe information (Rate Limited & on free trial)

### Key Features 🚀

- Users can register an account.
- Search for recipes with common language and applying dietary health filters.
- Users can save recipes to a list to reference in the future

### Challenges Faced 👷‍♂️

This was my first MERN (MongoDB, Express, React, Node) stack application, so there was a learning curve, however, my familiarity with using APIs and database interactions helped overcome this challenge.

Another issue I struggled with was rate limiting using the Edamam API. It involved me being thoughtful with the design to ensure I wasn't introducing significant rate limiting issues.

### Future Enhancements 🔮

I would love to leverage the full potentials of Edamam API, however, unfortunately the paid subscription tiers aren't quite feasible at this time. Since, this is primarily an educational passion project, this option wasn't available at this time.

### Dependency Configuration Steps 📃

For this project various different libraries are being used. For the front-end we are using tailwind CSS for styling. For the back-end we are using Express.js

1. Create vite app - React
2. Dependencies:
   `npm i express`

Easily restart server:
`npm i --save-dev nodemon`

Install Tailwind CSS (https://github.com/tailwindlabs/prettier-plugin-tailwindcss):
`npm install -D tailwindcss postcss autoprefixer`

`npm install -D prettier prettier-plugin-tailwindcss`

Configuring MongoDB Server Instructions:
Instructions followed from my cluster at https://cloud.mongodb.com/
`npm install mongodb`

`npm install dotenv`

`npm install react-router-dom`

`npm install @google-cloud/storage`

NextUI:
`npm i @nextui-org/react framer-motion`

#### Start Development Environment: 

Start server: `node --require dotenv/config server.js`

Start client: `npm run dev`

## Contributing 🤝
Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request.
