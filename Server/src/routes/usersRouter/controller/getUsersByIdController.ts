import  sequalize  from '../../../db'

const { Users, Properties } = sequalize.models

const getUsersById = async (id: string) => {

    const response = await Users.findByPk(id, {
        include: {
            model: Properties
        }
    })
    return response;
};

export default getUsersById;