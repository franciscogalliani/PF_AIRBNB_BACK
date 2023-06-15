import sequelize from "../../../db";

const { Locations } = sequelize.models;

const getLocations = async (province: string) => {
    try {
        const response = await Locations.findAll({
            attributes: ['nombre', 'ciudades'],
            where: {
                nombre: province
            }
        })
        if(response) return response;
        else throw new Error;
    } catch (error) {
        return error;
    }
}

export default getLocations;