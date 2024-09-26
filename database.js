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
                imageURL TEXT,
                UNIQUE(size, sale, price, imageURL)
            )
        `);
    });
};

export const populateDB = async () => {
    try {
        const db = await open({
            filename: './public/database/clothing.db',
            driver: sqlite3.Database
        });

        const shirtData = [
            { size: "Small", sale: 1, price: 25, imageURL: "/images/tshirt1.png" },
            { size: "Medium", sale: 0, price: 30, imageURL: "/images/tshirt2.png" },
            { size: "Large", sale: 1, price: 20, imageURL: "/images/tshirt3.png" },
            { size: "Extra Large", sale: 0, price: 35, imageURL: "/images/tshirt4.png" },
            { size: "Small", sale: 1, price: 15, imageURL: "/images/tshirt5.png" },
            { size: "Large", sale: 0, price: 20, imageURL: "/images/tshirt3.png" },
            { size: "Medium", sale: 0, price: 35, imageURL: "/images/tshirt4.png" },
            { size: "Small", sale: 0, price: 15, imageURL: "/images/tshirt5.png" },
            { size: "Small", sale: 0, price: 40, imageURL: "/images/tshirt6.png" },
            { size: "Large", sale: 1, price: 25, imageURL: "/images/tshirt1.png" },
            { size: "Small", sale: 0, price: 30, imageURL: "/images/tshirt4.png" }
        ];

        const placeholders = shirtData.map(() => '(?, ?, ?, ?)').join(', ');
        const values = shirtData.flatMap(shirt => [shirt.size, shirt.sale, shirt.price, shirt.imageURL]);

        await db.run(`
            INSERT OR IGNORE INTO clothing (size, sale, price, imageURL)
            VALUES ${placeholders}
        `, values);

        console.log("Database population complete!");
    } catch (error) {
        console.error("Error populating the database:", error);
        throw error;
    }
};


export const getDbConnection= () => {
    return open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    });
};