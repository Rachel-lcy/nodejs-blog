# Build A Blog by using Node.js, MongoDb, Express.js!

**App Description**
This is a Rachel's simple Blog, where I can share my thoughts in this blog about the high-tech technologies, my learning journey, my thoughts about Web developer and so on!

## Getting Started

- `npm run dev` run development server
- `npm run build` build app
- `npm run start` run the latest built app

## Main Developing Tools

- Express: A NodeJs web application framework
- NodeJs : A runtime environment that allows JavaScript to be executed on the server-side
- MongoDB(Mongoose): A NoSQL database used with Mongoose ODM(Object Data Modeling)
- MVC design pattern (https://developer.mozilla.org/en-US/docs/Glossary/MVC)

## Install Dependencies

- Server Deployment: [Render](https://render.com/deploy-docker/directus)
- Client Deployment: [Vercel](https://vercel.com/docs/frameworks/nextjs)
- MongoDB Database : [Mongoose](https://mongoosejs.com/docs/index.html)
- Node.js : [Nodemon](https://nodemon.io/)

## Development & Environment Variables Configuration

- Install Dependencies
  `npm install`
- Create .env file in the root directory of the project
  - `MONGODB_URL=your_mongodb_connection_string`
  - `JWT_SECRET=your_jwt_secret_key`
  - `SESSION_SECRET=your_session_secret_key`
- Start the local development server -`npm run dev`
  or
  - `nodemon app`

## Website Structure

- Home Page
- Admin(Sign in or Register)
- Dashboard(Admin Panel)
- Add New Post Page
- View / Edit Post Page
- Search Page

## Resources

- [NodeJs Express EJS Layouts and Partials] (https://raddy.dev/blog/nodejs-express-layouts-and-partials/)
- [express.Router]
  (https://expressjs.com/en/5x/api.html#express.router)
  (https://expressjs.com/en/5x/api.html#router)
- [ EJS usage] (https://ejs.co/#docs)
- [aria-expandend] (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded)
- [mongoose Aggregate()] (https://mongoosejs.com/docs/5.x/docs/api/aggregate.html#aggregate_Aggregate)
- [JavaScript parseInt()] (https://www.w3schools.com/jsref/jsref_parseint.asp)
- [cookie parser] (https://www.npmjs.com/package/cookie-parser)
- [connect-mongo] (https://www.npmjs.com/package/connect-mongo)
- [method-override] (https://expressjs.com/en/resources/middleware/method-override.html)

## VScode Extensions

- [EJS Language Support]
- [EJS Snippets]
- [Postman] for user testing (MongoDB collection)

## About Admin Page

- [Dashboard]

- The authMiddleware to check Wehther or not the user has already logged in!

- The administration can edit, update, delete posts!
