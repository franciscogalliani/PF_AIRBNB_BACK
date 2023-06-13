import { Op } from 'sequelize'
import  sequalize  from '../../../db'

const { Property, Rating, Service } = sequalize.models

const getAllPropsController = async (name: string | void) => {
    if(name){
        const response = await Property.findAll({
            // include: {
            //     model: Service,
            //     attributes: ['name'],
            //     through: {
            //         attributes: []
            //     }
            // },
            where: {
                name: { [Op.iLike]: `%${name}%`}
            }
        })
        if(response.length > 0){
            return response
        } return 'No hay propiedades con ese nombre'
    }
    const response = await Property.findAll({
        // include: {
        //     model: Service,
        //     attributes: ['name'],
        //     through: {
        //         attributes: []
        //     }
        // }
    });
    return response;
}

export default getAllPropsController;


