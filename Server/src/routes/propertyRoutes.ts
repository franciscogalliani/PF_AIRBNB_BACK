const { Router } = require('express');
const { getAllPropHandler, getPropById, createPropHandler } = require('../handlers/propertyHandlers')

const propertyRoutes = Router();

propertyRoutes.get('/', getAllPropHandler);
propertyRoutes.get('/:id', getPropById);
propertyRoutes.post('/', createPropHandler);

export default propertyRoutes;