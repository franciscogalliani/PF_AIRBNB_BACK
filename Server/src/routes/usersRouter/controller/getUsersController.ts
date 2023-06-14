import { Op } from 'sequelize'
import  sequalize  from '../../../db'

const { Users, Properties } = sequalize.models

export const getUsers =  async () => {
        //Es una prueba, cuando tengamos toda la bd se hace con  User.findAll().
        const response = await Users.findAll({
            include: {
                model: Properties,
            }
        });
        return response;
    }

export const getUsersByName = async (name: string) => {

        const response = await Users.findAll({
            include: {
                model: Properties,
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

export const getUsersById = async (id: string) => {
    const user: any = await Users.findByPk(id);
    const properties: any = await user.getProperties()

    return {
        ...user.get(),
        properties: properties.map((property: any) => property.get()),
      };
    };