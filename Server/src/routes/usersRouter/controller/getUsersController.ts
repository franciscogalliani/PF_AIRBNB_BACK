import { Op } from 'sequelize'
import  sequalize  from '../../../db'

const { User, Properties } = sequalize.models

export const getUsers =  async () => {
        //Es una prueba, cuando tengamos toda la bd se hace con  User.findAll().
        const response = await User.findAll({
            include: {
                model: Properties,
                attributes: ['id_property', 'title'],
                through: {
                    attributes: []
                }
            }
        });
        return response;
    }

export const getUsersByName = async (name: string) => {

        const response = await User.findAll({
            include: {
                model: Properties,
                attributes: ['id_property', 'title'],
                through: {
                    attributes: []
                }
            },
            where: {
                name: { [Op.iLike]: `%${name}%`}
            }
        })
        if(response.length > 0){
            return response
        }
        return 'No hay propiedades con ese nombre'
};

export const getUsersById = async (id: number) => {
    const response = await User.findAll({
        include: {
            model: Properties,
            attributes: ['id_property', 'title'],
            through: {
                attributes: []
            }
        },
        where: {
            id_usuario: id
        }
    })
    return response;
};