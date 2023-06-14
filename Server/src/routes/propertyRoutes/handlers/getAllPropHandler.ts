import { Request, Response } from "express";
import getAllPropsController from "../controllers/getAllPropsController";
import filterPropertiesController from "../controllers/filterPropertiesController";
import { PropertyAttributes } from "../../../models/Interfaces";


interface ExtendedPropertyAttributes extends PropertyAttributes {
    min_price_per_night?: number;
    max_price_per_night?: number;
}

const getAllPropHandler = async (req: Request, res: Response) => {
    const name = req.query.name as string
    const querys:object = req.query
    
    try {
        if (Object.keys(querys).length > 0) {
            const response = await filterPropertiesController(querys)
            return res.status(200).json(response)
        }
        if(name){
            const response = await getAllPropsController(name);
            return res.status(200).json(response);
        }
        const response = await getAllPropsController();
        if(response.length) return res.status(200).json(response)
        else throw new Error('No properties created')
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};

export default getAllPropHandler;