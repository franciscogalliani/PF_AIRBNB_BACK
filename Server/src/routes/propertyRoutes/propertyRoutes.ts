import { Router } from 'express';
import { getAllPropHandler, getPropByIdHandler, createPropHandler } from './handlers/propertyHandlers';

const propertyRoutes = Router();

propertyRoutes.get('/', getAllPropHandler);

propertyRoutes.get('/:id', getPropByIdHandler);

propertyRoutes.post('/', createPropHandler);

export default propertyRoutes;