import { connection } from "../database/database.js";
import { millsToDays } from "../library/dateHandlers.js";
import dayjs from "dayjs"

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
    const { customerId, gameId } = req.query

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

        if (customerId) {
            rentsQuery += `WHERE rentals."customerId" = ${customerId}`
        }

        if (gameId) {
            rentsQuery += `WHERE rentals."gameId" = ${gameId}`
        }

        const rents = await connection.query(rentsQuery)

        res.status(200).send(rents.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}


export async function deleteRent(req, res) {
    const { id } = req.params

    try {

        const rent = await connection.query('SELECT * FROM rentals WHERE id=$1',
            [id])

        if (!rent) {
            res.sendStatus(404)
            return
        }

        await connection.query('DELETE FROM rentals WHERE id = $1',
            [id])

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function returnGame(req, res) {
    const { id } = req.params

    try {

        const rent = await connection.query('SELECT * FROM rentals WHERE id=$1',
            [id])

        if (!rent.rows.length) {
            res.sendStatus(404)
            return
        }

        const isGameReturned = rent.rows[0].returnDate

        if(isGameReturned){
            res.sendStatus(400)
            return
        }

        const returnDate = new Date()
        const returnDateInMills = dayjs(returnDate).valueOf()
        const rentDateInMills = dayjs(rent.rows[0].rentDate).valueOf()
        const daysOfDelay = millsToDays(returnDateInMills - rentDateInMills)
        let delayFee = null

        if(daysOfDelay){
            delayFee = daysOfDelay*1500
        }

        await connection.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3',
            [returnDate, delayFee, id])


        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}
