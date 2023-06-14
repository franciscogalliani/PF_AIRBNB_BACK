import { Router } from "express";
import createUsersHandler from "./handler/createUsersHandler";
import getUsersHandler from "./handler/getUsersHandler";
import getUsersByIdHandler from "./handler/getUsersByIdHandler";

const usersRouter: Router = Router();

usersRouter.get("/", getUsersHandler)

usersRouter.get("/:id", getUsersByIdHandler)

usersRouter.post('/', createUsersHandler)



export default usersRouter;