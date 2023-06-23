import { Router } from 'express';
import createPreferenceHandler from './handlers/createPreferences';


const mercadoPagoRoutes = Router();

mercadoPagoRoutes.post("/create_preference" , createPreferenceHandler)

export default mercadoPagoRoutes;