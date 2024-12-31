import {pool} from "../db.js";
import {CustomerValidation,customertypeValidation} from "../validation/CustomerValidation.js";

const CustomertypeService = async (req) => {
    const { typeName} = req.body;
    const { error }  = customertypeValidation.validate(req.body);
    if (error) {
        return { code: 400,status:"fail",message: "Validation Error", data: error.details[0].message };
    }
    try {
        const existingUser = await pool.query(
            'SELECT * FROM customertype WHERE typeName = $1;',
            [typeName]
        )
        if (existingUser.rows.length > 0) {
            return { code: 403, status:"fail", message: "Customer Type is already exists." };
        }
        const result = await pool.query(
            'INSERT INTO customertype (typeName) VALUES ($1) RETURNING *;',
            [typeName]
        );
        return { code: 201, status:"success", message: "Successfully Created", data: result.rows };
    } catch (e) {
        console.log(e)
        return { code: 500, status:"fail", message: "Server Error" };
    }
}
const CustomerService = async (req) => {
    const { name,customertypeid } = req.body;
    const { error }  = CustomerValidation.validate(req.body);
    if (error) {
        return { code: 400,status:"fail",message: "Validation Error", data: error.details[0].message };
    }
    try {
        const existingUser = await pool.query(
            'SELECT * FROM customer WHERE name = $1;',
            [name]
        )
        if (existingUser.rows.length > 0) {
            return { code: 403, status:"fail",  message: "Customer is already exists." };
        }
        const result = await pool.query(
                'INSERT INTO customer (name,customertypeid) VALUES ($1,$2) RETURNING *;',
            [name, customertypeid]
        );
        return { code: 201, status:"success", message: "Successfully Created", data: result.rows };
    } catch (e) {
        console.log(e)
        return { code: 500, status:"fail", message: "Server Error" };
    }
}


export { CustomerService,CustomertypeService };