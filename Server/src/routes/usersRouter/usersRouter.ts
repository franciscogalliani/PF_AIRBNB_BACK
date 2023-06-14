import { Router } from "express";
import { getUsersHandler, getUsersByIdHandler, putUsersHandler } from "./handler/usersHandler"
import createUsersHandler from "./handler/createUsersHandler";

const usersRouter: Router = Router();

usersRouter.get("/", getUsersHandler)

usersRouter.get("/:id", getUsersByIdHandler)

usersRouter.post('/', createUsersHandler)

usersRouter.put('/:id', putUsersHandler)


export default usersRouter;