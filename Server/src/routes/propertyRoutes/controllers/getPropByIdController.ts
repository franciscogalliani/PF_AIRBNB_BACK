import  sequalize  from '../../../db'

const { Property, Rating, Service } = sequalize.models

const getPropById = async(id: number) => {
    const response = await Property.findAll({
        include: {
            model: Service,
            attributes: ['name'],
            through: {
                attributes: []
            }
        },
        where: {
            id: id
        }
    })
    return response;
};

export default getPropById;