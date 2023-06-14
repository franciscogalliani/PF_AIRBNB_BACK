import { Op } from 'sequelize'
import  sequalize  from '../../../db'

const { Properties, Ratings, Services } = sequalize.models

const getAllPropsController = async (name: string | void, page: number = 0) => {
    const size = 2
    const options = {
        limit: size,
        offset: page * size,
        include: {
            model: Services,
            attributes: ['name', 'icon'],
            through: {
                attributes: []
            }
        }
    }

    if(name){
        const response = await Properties.findAll({
            limit: size,
            offset: page * size,
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
            return {
                pages: page,
                total: response.length,
                properties: response
            } 
        } return 'No hay propiedades con ese nombre'
    }


    const { count, rows } = await Properties.findAndCountAll(options)

    return {
        total: count,
        properties: rows
    }
}

export default getAllPropsController;


