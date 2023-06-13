import sequelize from "../../../db"
import { PropertyAttributes } from "../../../models/Interfaces";

const {Properties} = sequelize.models


const createPropController = async (newProperty:Partial<PropertyAttributes>) => {
    const createdProperty = await Properties.create(newProperty)
    return  createdProperty
}

export default createPropController;
