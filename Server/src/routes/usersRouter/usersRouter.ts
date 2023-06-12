import { Router } from "express";
import { getUsersHandler, getUsersByIdHandler, postUsersHandler, putUsersHandler } from "./handler/usersHandler"

const usersRouter: Router = Router();

usersRouter.get("/", getUsersHandler)

usersRouter.get("/:id", getUsersByIdHandler)

usersRouter.post('/', postUsersHandler)

usersRouter.put('/:id', putUsersHandler)


export default usersRouter;