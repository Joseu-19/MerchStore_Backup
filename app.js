import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDbConnection, setupDatabase, populateDB } from "./database.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the templating engine
app.set('view engine', 'ejs');

setupDatabase().catch(console.error);
console.log("DB setup complete!");

populateDB().catch(console.error);
console.log("DB populated successfully!")

// Define routes
app.get('/', (req, res) => {
    getDbConnection()

    .then((db) => {
        return db.all('SELECT * FROM clothing')
    })
    .then((clothing) => {
        console.log(clothing);
        
        res.render("pages/index", {
            data: clothing
        });

    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error")
    });
});

app.get('/contacts', (req, res) => {
    res.render('pages/contacts');
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
