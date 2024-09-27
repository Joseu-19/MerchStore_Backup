import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const setupDatabase = () => {
    return open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.exec(`
            CREATE TABLE IF NOT EXISTS clothing (
                id INTEGER PRIMARY KEY,
                size TEXT,
                sale BOOLEAN,
                stock INTEGER,
                price INTEGER,
                imageURL TEXT,
                UNIQUE(id)  -- Ensure uniqueness based on id
            )
        `);
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
        const clothingItems = [
            { id: 1, size: 'Small', sale: 1, stock: 1, price: 25, imageURL: '/images/tshirt1.png' },
            { id: 2, size: 'Medium', sale: 0, stock: 0, price: 30, imageURL: '/images/tshirt2.png' },
            { id: 3, size: 'Large', sale: 1, stock: 0, price: 20, imageURL: '/images/tshirt3.png' },
            { id: 4, size: 'Extra Large', sale: 0, stock: 1, price: 35, imageURL: '/images/tshirt4.png' },
            { id: 5, size: 'Small', sale: 1, stock: 12, price: 15, imageURL: '/images/tshirt5.png' },
            { id: 6, size: 'Large', sale: 0, stock: 20, price: 40, imageURL: '/images/tshirt6.png' },
            { id: 7, size: 'Large', sale: 0, stock: 10, price: 100, imageURL: '/images/tshirt7.png' }
        ];

        const insertPromises = clothingItems.map(item => {
            return db.run(`
                INSERT OR IGNORE INTO clothing (id, size, sale, stock, price, imageURL)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [item.id, item.size, item.sale, item.stock, item.price, item.imageURL]);
        });

        return Promise.all(insertPromises)
            .then(() => console.log('Database populated with new data'))
            .catch((error) => console.error("Error populating the database:", error));
    });
};

export const getDbConnection = () => {
    return open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    });
};
