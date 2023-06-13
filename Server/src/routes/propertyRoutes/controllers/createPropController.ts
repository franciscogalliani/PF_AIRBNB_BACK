import sequelize from "../../../db"

const {Properties} = sequelize.models


const createPropController = async (newProperty) => {
    const createProperty = await Properties.create(newProperty)

}

export default createPropController;
