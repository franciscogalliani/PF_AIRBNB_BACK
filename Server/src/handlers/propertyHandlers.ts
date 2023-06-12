const { getAllPropsController } = require('../controllers/propertyController')

export const getAllPropHandler = (req: any, res: any) => {
    const { name } = req.query;

    try {
        if(name){
            const response = `getAllPropsController(${name})`;
            return res.status(200).json(response);
        }
        const response = 'getAllPropsController()'
        return res.status(200).json(response)
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};

export const getPropById = (req: any, res: any) => {
    const { id } = req.params;

    try {
        const response = `getPropById(${id})`;
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};

export const createPropHandler = (req: any, res: any) => {
    const { name, direction, type } = req.body;

    try {
        const response = `createPropHandler(${name}, ${direction}, ${type})`
        return res.status(200).json(response)
    } catch (error: any) {
        return res.status(400).json({Error: error.message})
    }
};
