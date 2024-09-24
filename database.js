import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export const setupDatabase = () => {
    return open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.exec(`
            CREATE TABLE IF NOT EXISTS clothing (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                size TEXT,
                sale BOOLEAN,
                price INTEGER,
                imageURL TEXT
            )
        `)
    });
};




export const populateDB = () => {
    return open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    }).then((db) => {
        return db.all(`SELECT * FROM clothing`)
            .then((existingClothes) => {
                if (existingClothes.length == 0) {
                    return db.run(`
                        INSERT INTO clothing (size, sale, price, imageURL)
                        VALUES 
                        ('Small', 1, 25, './public/images/tshirt1'),
                        ('Medium', 0, 30, './public/images/tshirt2'),
                        ('Large', 1, 20, './public/images/tshirt3'),
                        ('Extra Large', 0, 35, './public/images/tshirt4'),
                        ('Small', 1, 15, './public/images/tshirt5'),
                        ('Large', 0, 40, './public/images/tshirt6')                        
                    `);
                } else {
                    console.log('Data already seeded!');
                    return Promise.resolve();
                }
            });
    }).catch((error) => {
        console.error("Error populating the database:", error);
    });
};


export const getDbConnection= () => {
    return open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    });
};