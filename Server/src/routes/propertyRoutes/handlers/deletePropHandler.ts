import { Request, Response } from "express";
import deletePropertyById from "../controllers/deletePropController";

const deletePropHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedProperty = await deletePropertyById(Number(id))
        res.status(200).json(deletedProperty)
    } catch (error) {
        const errorMessage = (error as Error).message
        res.status(400).send({error: errorMessage})       
    }
}
export default deletePropHandler;