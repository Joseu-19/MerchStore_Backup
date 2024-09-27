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
                stock BOOLEAN,
                price INTEGER,
                imageURL TEXT
            )
        `)
    });
};

export const clearDatabase = () => {
    return open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.run(`DELETE FROM clothing`);
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
                        INSERT INTO clothing (size, sale, stock, price, imageURL)
                        VALUES 
                        ('Small', 1, 1, 25, '/images/tshirt1.png'),
                        ('Medium', 0, 0, 30, '/images/tshirt2.png'),
                        ('Large', 1, 0, 20, '/images/tshirt3.png'),
                        ('Extra Large', 0, 1,  35,'/images/tshirt4.png'),
                        ('Small', 1, 1, 15, '/images/tshirt5.png'),
                        ('Large', 0, 0, 40, '/images/tshirt6.png')                        
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