import { Op } from 'sequelize'
import  sequalize  from '../../../db'

const { Properties, Ratings, Services } = sequalize.models

const getAllPropsController = async (name: string | void) => {
    if(name){
        const response = await Properties.findAll({
            include: {
                model: Services,
                attributes: ['name', 'icon'],
                through: {
                    attributes: []
                }
            },
            where: {
                title: { [Op.iLike]: `%${name}%`}
            }
        })
        if(response.length > 0){
            return response
        } return 'No hay propiedades con ese nombre'
    }
    const response = await Properties.findAll({
        include: {
            model: Services,
            attributes: ['name', 'icon'],
            through: {
                attributes: []
            }
        }
    });
    return response;
}

export default getAllPropsController;


