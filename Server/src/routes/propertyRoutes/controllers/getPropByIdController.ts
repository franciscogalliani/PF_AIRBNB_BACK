import  sequalize  from '../../../db'

const { Properties, Ratings, Services } = sequalize.models

const getPropById = async(id: number) => {
    const response = await Properties.findAll({
        include: {
            model: Services,
            attributes: ['name','icon'],
            through: {
                attributes: []
            }
        },
        where: {
            id_property: id
        }
    })
    return response;
};

export default getPropById;