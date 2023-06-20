import  sequalize  from '../../../db'

const { Users, Properties, Rents } = sequalize.models

const getUsersById = async (id: string) => {

    const response = await Users.findByPk(id, {
        include: [{
            model: Properties,
            include: {
                model: Rents,
                include: {
                    model: Users,
                    foreignKey: 'id_user'
                }
            }
        },
        {
            model: Rents,
            include: {
                model: Properties,
                include: {
                    model: Users,
                    foreignKey: 'id_user'
                }
            }
        }
    ]
    })
    return response;
};

export default getUsersById;