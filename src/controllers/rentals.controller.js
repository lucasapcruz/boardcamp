import { connection } from "../database/database.js";
import { formatDate } from "../library/dateHandlers.js";

export async function createGameRent(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {

        const customer = await connection.query("SELECT * FROM customers WHERE id=$1",
            [customerId])

        if (!customer.rows.length) {
            res.sendStatus(400)
            return
        }

        const game = await connection.query("SELECT * FROM games WHERE id=$1",
            [gameId])

        if (!game.rows.length) {
            res.sendStatus(400)
            return
        }

        const rentsForTheGame = await connection.query('SELECT COUNT(*) FROM rentals WHERE "gameId"=$1',
            [gameId])

        const gameHasAvailableSets = game.rows[0].stockTotal > rentsForTheGame.rows[0].count

        if (!gameHasAvailableSets) {
            res.sendStatus(400)
            return
        }

        const rentDate = new Date()
        const originalPrice = daysRented * game.rows[0].pricePerDay
        const returnDate = null
        const delayFee = null

        await connection.query(
            'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" ) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);


        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getRents(req, res) {
    const {customerId, gameId} = req.query
    console.log(customerId)
    console.log(gameId)

    try {

        let rentsQuery =
            'SELECT ' +
            'rentals.*, ' +
            "json_build_object('id', customer.id, 'name', customer.name) AS customer, " +
            "json_build_object('id', game.id, 'name', game.name, 'categoryId', game.\"categoryId\", 'categoryName', game.\"categoryName\") AS game " +
            'FROM ' +
            'rentals ' +
            'JOIN ( ' +
            'SELECT ' +
            'customers.id, ' +
            'customers.name ' +
            'FROM ' +
            'customers) AS customer ON ' +
            'rentals."customerId" = customer.id ' +
            'JOIN ( ' +
            'SELECT ' +
            'games.id, ' +
            'games.name, ' +
            'games."categoryId", ' +
            'categories.name AS "categoryName" ' +
            'FROM ' +
            'games ' +
            'JOIN categories ON ' +
            'games."categoryId" = categories.id) AS game ON ' +
            'rentals."gameId" = game.id '

        if(customerId){
            rentsQuery += `WHERE rentals."customerId" = ${customerId}`
        }

        if(gameId){
            rentsQuery += `WHERE rentals."gameId" = ${gameId}`
        }

        const rents = await connection.query(rentsQuery)

        res.status(200).send(rents.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}