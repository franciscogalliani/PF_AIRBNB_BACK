import { Op, OrderItem } from 'sequelize';
import sequelize from '../../../db';
import { PropertyAttributes } from '../../../models/Interfaces';

const { Properties, Services, Rents } = sequelize.models;

const filterPropertiesController = async (filterProperties: Partial<any>, page: number = 0) => {
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
        accessibility,
        start_date,
        end_date,
    } = filterProperties;

    const accessibilityClause: any = {}

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

    if (bathrooms_number !== undefined) {
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
                where: services && services.length > 0 ? { name: { [Op.in]: services } } : {},
            },
            {
                model: Rents,
                where: {
                    [Op.or]: [
                        {
                            start_date: {
                                [Op.between]: [start_date, end_date],
                            },
                        },
                        {
                            end_date: {
                                [Op.between]: [start_date, end_date],
                            },
                        },
                        {
                            [Op.and]: [
                                {
                                    start_date: {
                                        [Op.lte]: start_date,
                                    },
                                },
                                {
                                    end_date: {
                                        [Op.gte]: end_date,
                                    },
                                },
                            ],
                        },
                    ],
                },
                required: false,
            },
        ],
        where: {
            ...whereClause,
            ...priceClause,
            ...guestsClause,
            ...bathroomsClause,
            ...bedsClause,
            ...roomsClause,
            ...accessibilityClause,
            start_date: {
                [Op.lte]: start_date,
            },
            end_date: {
                [Op.gte]: end_date,
            },
        },
        order: [['price_per_night', order_price === 'des' ? 'DESC' : 'ASC']] as OrderItem[],
    };

   

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
            ...accessibilityClause,
            start_date: {
                [Op.lte]: start_date,
            },
            end_date: {
                [Op.gte]: end_date,
            },
        },
    });

    const pagesNumber = Math.ceil(allProperties / size);

    const filteredProperties = await Promise.all(properties.map(async (property: any) => {
        const propertyServices: any = await property.getServices();
        const propertyServiceNames = propertyServices.map((service: any) => service.name);

        if (services && services.length > 0) {
            const hasAllServices = services.every((service: any) => propertyServiceNames.includes(service));
            if (!hasAllServices) {
                return null;
            }
        }

        return property;
    }));

    const validProperties = filteredProperties.filter((property) => property !== null);

    const overlappingRents = await Rents.findAll({
        where: {
            [Op.or]: [
                {
                    start_date: {
                        [Op.between]: [start_date, end_date],
                    },
                },
                {
                    end_date: {
                        [Op.between]: [start_date, end_date],
                    },
                },
                {
                    [Op.and]: [
                        {
                            start_date: {
                                [Op.lte]: start_date,
                            },
                        },
                        {
                            end_date: {
                                [Op.gte]: end_date,
                            },
                        },
                    ],
                },
            ],
        },
    });

    const overlappingProperties = overlappingRents.map((rent: any) => rent.property_id);

    // Devolver las propiedades que no tienen reservas que se superponen con el rango de fechas deseado
    const availableProperties = validProperties.filter((property) => !overlappingProperties.includes(property.id));

    const result = {
        pagesNumber,
        properties: availableProperties,
    };

    if (validProperties.length > 0) {
        return result;
    }

    return "No existen propiedades con esas características";
};

export default filterPropertiesController;


