import { Router } from 'express';
import getAllPropHandler from './handlers/getAllPropHandler';
import getPropByIdHandler from './handlers/getPropByIdHandler';
import createPropHandler from './handlers/createPropHandler';
import updatePropertyStatusHandler from './handlers/updatePropertyStatusHandler';

const propertyRoutes = Router();

propertyRoutes.get('/', getAllPropHandler);

propertyRoutes.get('/:id', getPropByIdHandler);

propertyRoutes.post('/', createPropHandler);

propertyRoutes.put('/:id/deactivate', updatePropertyStatusHandler);

export default propertyRoutes;