import { Request, Response } from "express";
import getPropById from "../controllers/getAllPropsController";

const getPropByIdHandler = async (req: Request, res: Response) => {
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

export default getPropByIdHandler;