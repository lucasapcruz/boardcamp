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

        let customers

        if(cpf){
            customers = await connection.query("SELECT * FROM customers WHERE cpf ILIKE $1", [`${cpf}%`])
        }else{
            customers = await connection.query("SELECT * FROM customers")
        }

        res.status(200).send(customers.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getCustomersById(req, res) {
    const {id} = req.params

    try {

        const customer = await connection.query("SELECT * FROM customers WHERE id = $1", [id])

        if(!customer.rows.length){
            res.sendStatus(404)
            return
        }

        res.status(200).send(customer.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function updateCustomer(req, res) {
    const {id} = req.params
    const { name, phone, cpf, birthday } = req.body;

    try {

        const customer = await connection.query("SELECT * FROM customers WHERE id = $1", [id])

        if(!customer.rows.length){
            res.sendStatus(404)
            return
        }

        const otherCustomerWithSameCpf = await connection.query("SELECT * FROM customers WHERE cpf=$1 AND id!=$2",
            [cpf, id])

        if (otherCustomerWithSameCpf.rows.length) {
            res.sendStatus(409)
            return
        }

        await connection.query("UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
        [name, phone, cpf, birthday, id])


        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500);
    }
}