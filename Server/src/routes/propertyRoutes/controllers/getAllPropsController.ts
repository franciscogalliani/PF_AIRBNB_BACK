import  sequalize  from '../../../db'

const { Properties, Ratings, Services } = sequalize.models

const getAllPropsController = async () => {
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


