import { connection } from "../database/database.js";

export async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {

        const customer = await connection.query("SELECT * FROM customers WHERE cpf=$1",
            [cpf])

        if (customer.rows.length) {
            res.sendStatus(409)
            return
        }

        await connection.query(
            'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
            [name, phone, cpf, birthday]
        );


        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getCustomers(req, res) {
    const {cpf} = req.query

    try {

        let games

        if(cpf){
            games = await connection.query("SELECT * FROM customers WHERE cpf ILIKE $1", [`${cpf}%`])
        }else{
            games = await connection.query("SELECT * FROM customers")
        }

        res.status(200).send(games.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}