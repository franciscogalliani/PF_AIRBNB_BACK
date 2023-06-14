import sequelize from "../../../db";
import { PropertyAttributes } from "../../../models/Interfaces";


const { Properties, Services } = sequelize.models;

interface Property_Services extends PropertyAttributes {
    services?: string[];
}


const createPropController = async (newProperty: Partial<Property_Services>) => {
    const services: string[] | undefined = newProperty.services;

    const createdProperty: any = await Properties.create(newProperty);

    if (services && services.length > 0) {
        const servicesFromDb = await Services.findAll({ where: { name: services } });
        await createdProperty.addServices(servicesFromDb);
    }

    return createdProperty;
};

export default createPropController;
