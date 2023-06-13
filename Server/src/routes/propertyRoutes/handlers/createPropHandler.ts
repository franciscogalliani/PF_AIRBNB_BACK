import { Request, Response } from "express";
import createPropController from "../controllers/createPropController";
import { PropertyAttributes } from "../../../models/Interfaces";


const createPropHandler = async(req: Request, res: Response) => {
    // const {
    //     title,
    //     province,
    //     location,
    //     address,
    //     zip_code,
    //     property_type,
    //     description,
    //     price_per_night,
    //     images,
    //     rating,
    //     ratings_amount,
    //     start_date,
    //     end_date,
    //     rooms_number,
    //     bathrooms_number,
    //     beds_number,
    //     max_guests,
    //     allow_pets,
    //     weekly_discount,
    //     monthly_discount,
    //     min_nights
    // } = req.body;

    const newProperty = {
        title,
        province,
        location,
        address,
        zip_code,
        property_type,
        description,
        price_per_night,
        images,
        rating,
        ratings_amount,
        start_date,
        end_date,
        rooms_number,
        bathrooms_number,
        beds_number,
        max_guests,
        allow_pets,
        weekly_discount,
        monthly_discount,
        min_nights
    }

    try {
        const response = await createPropController(req.body)
        return res.status(200).json(response)
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};

export default createPropHandler;