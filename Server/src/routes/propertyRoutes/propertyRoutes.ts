import { Router } from 'express';
import { getAllPropHandler, getPropById, createPropHandler } from '../../handlers/propertyHandlers';

const propertyRoutes = Router();

propertyRoutes.get('/', getAllPropHandler);

propertyRoutes.get('/:id', getPropById);

propertyRoutes.post('/', createPropHandler);

export default propertyRoutes;