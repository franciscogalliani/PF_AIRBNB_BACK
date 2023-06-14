import { Op } from 'sequelize';
import sequalize from '../../../db';
import { PropertyAttributes } from '../../../models/Interfaces';

const { Properties } = sequalize.models;

interface ExtendedPropertyAttributes extends PropertyAttributes {
    min_price_per_night?: number;
    max_price_per_night?: number;
}

const filterPropertiesController = async (filterProperties: Partial<ExtendedPropertyAttributes>) => {
    const {
        province,
        location,
        allow_pets,
        property_type,
        max_guests,
        min_price_per_night,
        max_price_per_night
    } = filterProperties;

    const whereClause: any = {};

    if (province) {
        whereClause.province = province;
    }

    if (location) {
        whereClause.location = location;
    }

    if (allow_pets !== undefined) {
        whereClause.allow_pets = allow_pets;
    }

    if (property_type) {
        whereClause.property_type = property_type;
    }

    if (max_guests !== undefined) {
        whereClause.max_guests = max_guests;
    }

    const priceClause: any = {};

    if (min_price_per_night !== undefined && max_price_per_night !== undefined) {
        priceClause.price_per_night = {
            [Op.between]: [min_price_per_night, max_price_per_night]
        };
    } else if (min_price_per_night !== undefined) {
        priceClause.price_per_night = {
            [Op.gte]: min_price_per_night
        };
    } else if (max_price_per_night !== undefined) {
        priceClause.price_per_night = {
            [Op.lte]: max_price_per_night
        };
    }

    const properties = await Properties.findAll({
        where: {
            ...whereClause,
            ...priceClause
        }
    });
    console.log(properties.length);
    
    if (properties.length > 0) return properties;

    return "No existen propiedades con esas caracteristicas"
};

export default filterPropertiesController;
