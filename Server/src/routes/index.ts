import { Router } from "express";
import propertyRoutes from "./propertyRoutes";
import usersRouter from "./usersRouter/usersRouter";

const router: Router = Router();

router.use('/users', usersRouter)
router.use('/property', propertyRoutes);

export default router;