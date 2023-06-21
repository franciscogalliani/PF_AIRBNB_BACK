import { Router } from 'express';
import getAllPropHandler from './handlers/getAllPropHandler';
import getPropByIdHandler from './handlers/getPropByIdHandler';
import createPropHandler from './handlers/createPropHandler';
import deletePropHandler from './handlers/deletePropHandler';

const propertyRoutes = Router();

propertyRoutes.get('/', getAllPropHandler);

propertyRoutes.get('/:id', getPropByIdHandler);

propertyRoutes.post('/', createPropHandler);

propertyRoutes.delete('/:id', deletePropHandler);

export default propertyRoutes;