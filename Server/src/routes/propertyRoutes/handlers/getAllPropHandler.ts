import { Request, Response } from "express";
import getAllPropsController from "../controllers/getAllPropsController";



const getAllPropHandler = async (req: Request, res: Response) => {
    const name = req.query.name as string

    try {
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