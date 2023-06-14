import { Request, Response } from "express";
import getAllPropsController from "../controllers/getAllPropsController";
import filterPropertiesController from "../controllers/filterPropertiesController";



const getAllPropHandler = async (req: Request, res: Response) => {
    const querys:object = req.query
    try {
        if (Object.keys(querys).length > 0) {
            const response = await filterPropertiesController(querys)
            return res.status(200).json(response)
        }
        const response = await getAllPropsController();
        if(response.length) return res.status(200).json(response)
        else throw new Error('No properties created')
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};

export default getAllPropHandler;