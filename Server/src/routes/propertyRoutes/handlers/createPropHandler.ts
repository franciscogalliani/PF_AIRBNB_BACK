import { Request, Response } from "express";
import createPropController from "../controllers/createPropController";


const createPropHandler = async(req: Request, res: Response) => {
    const { title, location, id_property } = req.body;

    try {
        const response = await createPropController(title, location, id_property)
        return res.status(200).json(response)
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};

export default createPropHandler;