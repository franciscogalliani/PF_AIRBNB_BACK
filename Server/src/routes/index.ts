import { Router } from "express";
import usersRouter from "./usersRouter/usersRouter";
import propertyRoutes from "./propertyRoutes/propertyRoutes";

const router: Router = Router();

router.use('/users', usersRouter);

router.use('/property', propertyRoutes);

export default router;
