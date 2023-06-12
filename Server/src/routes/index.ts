import { Router } from "express";
import propertyRoutes from "./propertyRoutes";

const router: Router = Router();

router.use('/property', propertyRoutes);

export default router;