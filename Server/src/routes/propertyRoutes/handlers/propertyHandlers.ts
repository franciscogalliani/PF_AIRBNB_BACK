import { Request, Response } from "express";
import { getAllPropsController, getPropById, createPropController } from "../controllers/propertyControllers";

export const getAllPropHandler = async (req: Request, res: Response) => {
    const name = req.query.name as string

    try {
        if(name){
            const response = await getAllPropsController(name);
            return res.status(200).json(response);
        }
        const response = await getAllPropsController();
        return res.status(200).json(response)
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};

export const getPropByIdHandler = async (req: Request, res: Response) => {
    const  { id } = req.params
    const numberId: number = Number(id)
    
    try {
        if(id){
            const propById = await getPropById(numberId)
            res.status(200).json(propById)
        }
    } catch (error) {
        const errorMessage = (error as Error).message
        res.status(400).send({error: errorMessage})
    }
};

export const createPropHandler = async(req: Request, res: Response) => {
    const { title, location, id_property } = req.body;

    try {
        const response = await createPropController(title, location, id_property)
        return res.status(200).json(response)
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};
