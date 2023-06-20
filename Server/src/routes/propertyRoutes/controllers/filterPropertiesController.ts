import { Op, OrderItem } from 'sequelize';
import sequelize from '../../../db';
import { PropertyAttributes } from '../../../models/Interfaces';

const { Properties, Services } = sequelize.models;

interface ExtendedPropertyAttributes extends PropertyAttributes {
    min_price_per_night?: number;
    max_price_per_night?: number;
    order_price?: string;
}

// function getDatesInRange(startDate: any, endDate: any) {
//     var dates = [];
//     var currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//         dates.push(new Date(currentDate));
//         currentDate.setDate(currentDate.getDate() + 1);
//     }
//     return dates;
// }

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
        start_date,
        end_date
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

    const dateClause: any = {};

    // const rageDate = getDatesInRange(start_date, end_date);

    // console.log(rageDate);
    
    if(start_date && end_date){
        dateClause.end_date = {
            [Op.between]: [start_date, end_date]
        }
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

    const size = 5;

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
            ...dateClause
        },
        order: [['price_per_night', order_price === 'des' ? 'DESC' : 'ASC']] as OrderItem[],
    };

    const properties = await Properties.findAll(options);
    console.log(properties.length);


    const allProperties = await Properties.count({
        where: {
        ...whereClause,
        ...priceClause,
        ...dateClause
    }})

    const pagesNumber= Math.ceil(allProperties / size)

    const result = {
        pagesNumber,
        properties
    }

    if (properties.length > 0) return result;

    return "No existen propiedades con esas características";
};

export default filterPropertiesController;

