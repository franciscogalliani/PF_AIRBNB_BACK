import { Op, OrderItem } from 'sequelize';
import sequelize from '../../../db';
import { PropertyAttributes } from '../../../models/Interfaces';

const { Properties, Services } = sequelize.models;

interface ExtendedPropertyAttributes extends PropertyAttributes {
    min_price_per_night?: number;
    max_price_per_night?: number;
    order_price?: string;
}

const filterPropertiesController = async (filterProperties: Partial<ExtendedPropertyAttributes>, page: number = 0) => {
    const {
        province,
        location,
        allow_pets,
        property_type,
        max_guests,
        min_price_per_night,
        max_price_per_night,
        order_price,
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
            [Op.between]: [min_price_per_night, max_price_per_night],
        };
    } else if (min_price_per_night !== undefined) {
        priceClause.price_per_night = {
            [Op.gte]: min_price_per_night,
        };
    } else if (max_price_per_night !== undefined) {
        priceClause.price_per_night = {
            [Op.lte]: max_price_per_night,
        };
    }

    const size = 3;

    const options = {
        limit: size,
        offset: page * size,
        include: {
            model: Services,
            attributes: ['name', 'icon'],
            through: {
                attributes: [],
            },
        },
        where: {
            ...whereClause,
            ...priceClause,
        },
        order: [['price_per_night', order_price === 'des' ? 'DESC' : 'ASC']] as OrderItem[],
    };

    const properties = await Properties.findAll(options);
    console.log(properties.length);

    if (properties.length > 0) return properties;

    return "No existen propiedades con esas características";
};

export default filterPropertiesController;
