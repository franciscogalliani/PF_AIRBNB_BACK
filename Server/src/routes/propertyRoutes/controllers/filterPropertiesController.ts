import { Op, OrderItem } from 'sequelize';
import sequelize from '../../../db';
import { PropertyAttributes } from '../../../models/Interfaces';

const { Properties, Services } = sequelize.models;

interface ExtendedPropertyAttributes extends PropertyAttributes {
    min_price_per_night?: number;
    max_price_per_night?: number;
    order_price?: string;
    services?: string[]
}

const filterPropertiesController = async (filterProperties: Partial<ExtendedPropertyAttributes>, page: number = 0) => {
    let {
        province,
        location,
        allow_pets,
        property_type,
        max_guests,
        min_price_per_night,
        max_price_per_night,
        order_price,
        services,
        bathrooms_number,
        beds_number,
        rooms_number,
        accessibility
    } = filterProperties;

    const accessibilityClause:any = {}

    if (accessibility !== undefined){
        accessibilityClause.accessibility= accessibility
    }

    const roomsClause: any = {};

    if (rooms_number !== undefined) {
        roomsClause.rooms_number = rooms_number
    }


    const bedsClause: any = {};

    if (beds_number !== undefined) {
        bedsClause.beds_number = beds_number
    }


    const bathroomsClause: any = {};

    if (bathroomsClause !== undefined) {
        bathroomsClause.bathrooms_number = bathrooms_number
    }

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

    const guestsClause: any = {};

    if (max_guests !== undefined) {
        guestsClause.max_guests = { [Op.lte]: max_guests };
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

    const size = 100;

    const options = {
        limit: size,
        offset: page * size,
        include: [
            {
                model: Services,
                attributes: ['name', 'icon'],
                through: {
                    attributes: [],
                },
                where: {},
            },
        ],
        where: {
            ...whereClause,
            ...priceClause,
            ...guestsClause,
            ...bathroomsClause,
            ...bedsClause,
            ...roomsClause,
            ...accessibilityClause
        },
        order: [['price_per_night', order_price === 'des' ? 'DESC' : 'ASC']] as OrderItem[],
    };

    if (services && services.length > 0) {
        options.include[0].where = {
            name: { [Op.in]: services },
        };
    }

    const properties = await Properties.findAll(options);

    const allProperties = await Properties.count({
        include: {
            model: Services,
            attributes: ['name', 'icon'],
            through: {
                attributes: [],
            }
        },
        where: {
            ...whereClause,
            ...priceClause,
            ...guestsClause,
            ...bathroomsClause,
            ...bedsClause,
            ...roomsClause,
            ...accessibilityClause
        }
    });

    const pagesNumber = Math.ceil(allProperties / size);

    const filteredProperties = await Promise.all(properties.map(async (property: any) => {
        const propertyServices: any = await property.getServices();
        const propertyServiceNames = propertyServices.map((service: any) => service.name);

        if (services && services.length > 0) {
            const hasAllServices = services.every((service) => propertyServiceNames.includes(service));
            if (!hasAllServices) {
                return null;
            }
        }

        return property;
    }));

    const validProperties = filteredProperties.filter((property) => property !== null);

    console.log(validProperties.length);

    const result = {
        pagesNumber,
        properties: validProperties,
    };

    if (validProperties.length > 0) {
        return result;
    }

    return "No existen propiedades con esas características";
};

export default filterPropertiesController;


