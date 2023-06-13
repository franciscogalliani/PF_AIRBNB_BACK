import { Request, Response } from "express";
import createPropController from "../controllers/createPropController";
import { PropertyAttributes } from "../../../models/Interfaces";


const createPropHandler = async(req: Request, res: Response) => {
    const newProperty = req.body as PropertyAttributes
    try {
        const response = await createPropController(newProperty)
        return res.status(200).json(response)
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};

export default createPropHandler;