import { Router } from "express";
import usersRouter from "./usersRouter/usersRouter";
import propertyRoutes from "./propertyRoutes/propertyRoutes";
import serviceRoutes from "./servicesRoutes/serviceRouter";
import locationsRouter from "./locationsRoutes/locationsRouter";

const router: Router = Router();

router.use('/users', usersRouter);

router.use('/property', propertyRoutes);

router.use('/services', serviceRoutes);

router.use('/locations', locationsRouter);

export default router;
