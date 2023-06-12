import { Router } from "express";
import usersRouter from "./usersRouter/usersRouter";



const router: Router = Router();

router.use('/users', usersRouter)


export default router;