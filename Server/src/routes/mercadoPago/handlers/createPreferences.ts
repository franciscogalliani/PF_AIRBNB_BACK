import { Request, Response, Express } from "express";
import mercadoPagoPreference from "../../../utils/mercadoPago";



const createPreferenceHandler = async (req: Request, res: Response) => {
    try {
        const { title, unit_price } = req.body as any
        const response = await mercadoPagoPreference(title, unit_price);
        res.status(201).json(response)
    } catch (error) {
        res.status(404).json(error)
    }
};



export default createPreferenceHandler;