# Clothing Website

Node Packages
- npm install express ejs install sqlite sqlite3 body-parser                                 


## Design Strategy

### 1. Separation of Concerns

The project ensures that every component of the application is modular and maintained by adhering to a clear separation of concerns. A dedicated database.js file contains the logic for configuring the database, seeding initial data, and establishing connections. This keeps the handling of routes and HTTP requests in the main application file (app.js) in focus. By employing EJS templates, the presentation layer and business logic are further divided, enabling dynamic view rendering without clogging up the server-side code. The Model-View-Controller (MVC) architecture is followed by this framework, which facilitates future scaling and modification of the project.

### 2. Server & Routing

The application has a well-structured Express routing system with routes set up for important pages such as the contacts, about, and homepage. While static material is presented on other pages, data from the SQLite database is dynamically fetched and displayed on the homepage. The layout includes a navigation menu that makes it easy to access various routes. Users can effortlessly browse between various sections of the website by tying the routes to the menu. Each route renders its associated EJS view, making the user experience intuitive and user-friendly.

---

- Team Members: Areeb Shaikh, Jose Urizar, Danish Gopalakrishnan

