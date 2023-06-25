import  sequalize  from '../../../db'

const { Users, Properties, Rents } = sequalize.models

const getUsersById = async (id: string) => {

    const user = await Users.findByPk(id);
    const properties = await user.getProperties();
    const response = await Users.findByPk(id, {
        include: {
            model: Rents,
            include: {
                model: Properties,
                include: {
                    model: Users,
                    foreignKey: 'id_user'
            }
        }
        }
    })
    const userObj = response.toJSON();
    userObj.properties = properties.map((property: any) => property.dataValues);
    return userObj;
};

export default getUsersById;