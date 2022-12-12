import { Router } from "express";
import { createCustomer, getCustomers } from "../controllers/customers.controller.js";
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.js";

const customersRoute = Router();

customersRoute.post("/customers", customerSchemaValidation, createCustomer)
customersRoute.get("/customers",getCustomers)


export default customersRoute;
