import { Request, Response } from "express";
import createPropController from "../controllers/createPropController";
import { PropertyAttributes } from "../../../models/Interfaces";
import formBodyCheck from "../../../controllers/checkFormProps";


const createPropHandler = async(req: Request, res: Response) => {
    const propertiesArray: string[] = [
        "id_user",
        "title",
        "province",
        "location",
        "address",
        "zip_code",
        "property_type",
        "description",
        "price_per_night",
        "images",
        "rating",
        "ratings_amount",
        "start_date",
        "end_date",
        "is_active",
        "rooms_number",
        "bathrooms_number",
        "beds_number",
        "max_guests",
        "allow_pets",
        "weekly_discount",
        "monthly_discount",
        "min_nights",
    ]
    const result: string|boolean = formBodyCheck(propertiesArray, req.body)

    const newProperty = req.body as PropertyAttributes
    
    try {
        if(result === true){
            const response = await createPropController(newProperty)
            return res.status(200).json(response)
        }
        else throw new Error(`${result}`)
    } catch (error) {
        const errorMessage = (error as Error).message
        console.log(errorMessage);
        return res.status(400).send({error: errorMessage})
    }
};

export default createPropHandler;