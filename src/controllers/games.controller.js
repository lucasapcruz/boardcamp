import { connection } from "../database/database.js";

export async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        const category = await connection.query("SELECT * FROM categories WHERE id=$1",
            [categoryId])

        if (!category.rows.length) {
            res.sendStatus(400)
            return
        }

        const game = await connection.query("SELECT * FROM games WHERE name=$1",
            [name])

        console.log(game)

        if (game.rows.length) {
            res.sendStatus(409)
            return
        }

        await connection.query(
            'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
            [name, image, stockTotal, categoryId, pricePerDay]
        );


        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getGames(req, res) {
    const {name} = req.query

    try {

        let games

        if(name){
            games = await connection.query("SELECT * FROM games WHERE name ILIKE $1", [`${name}%`])
        }else{
            games = await connection.query("SELECT * FROM games")
        }

        res.status(200).send(games.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}