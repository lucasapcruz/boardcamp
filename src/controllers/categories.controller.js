import { connection } from "../database/database.js";

export async function createCategory(req, res) {
    const { name } = req.body;

    try {
        const category = await connection.query("SELECT * FROM categories WHERE name=$1", [name])

        if (category.length) {
            res.sendStatus(409)
            return
        }

        await connection.query(
            "INSERT INTO categories (name) VALUES ($1)",
            [name]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getCategories(req, res) {

    try {
        const categories = await connection.query("SELECT * FROM categories")

        res.status(200).send(categories.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}