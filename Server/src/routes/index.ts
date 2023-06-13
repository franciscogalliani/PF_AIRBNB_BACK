import { Router } from "express";
import usersRouter from "./usersRouter/usersRouter";
import propertyRoutes from "./propertyRoutes/propertyRoutes";
import serviceRoutes from "./servicesRoutes/serviceRouter";

const router: Router = Router();

router.use('/users', usersRouter);

router.use('/property', propertyRoutes);

router.use('/services', serviceRoutes);

export default router;
