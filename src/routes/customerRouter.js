import { Router } from "express";
import { createCustomer, getCustomers, getCustomersById, updateCustomer } from "../controllers/customers.controller.js";
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.js";

const customersRoute = Router();

customersRoute.post("/customers", customerSchemaValidation, createCustomer)
customersRoute.get("/customers",getCustomers)
customersRoute.get("/customers/:id", getCustomersById)
customersRoute.put("/customers/:id", customerSchemaValidation, updateCustomer)


export default customersRoute;
