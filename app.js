import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDbConnection, setupDatabase, populateDB, clearDatabase } from "./database.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

setupDatabase().catch(console.error);
console.log("DB setup complete!");

populateDB().catch(console.error);
console.log("DB populated successfully!");

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

app.get('/about', (req, res) => {
    res.render('pages/about');
});
app.get('/shop', (req, res) => {
    getDbConnection()
    .then((db) => {
        return db.all('SELECT * FROM clothing');  
    })
    .then((clothing) => {
        res.render('pages/shop', { data: clothing });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error");
    });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
