import { Router } from "express";

const usersRouter: Router = Router();

usersRouter.get("/", (_req,res)=>{
    res.status(200).send("GET de todos los usuarios")
})

usersRouter.get("/:id", (req,res)=>{
    const {id} = req.params
    res.status(200).send(`GET del user con ID = ${id}`)
})

usersRouter.post('/',(req,res)=>{
    const {name,lastname,email,direction,genre}=req.body
    res.status(200).send(`POST para crear el usuario ${name},${lastname}- EMAIL:${email}- DIRECTION:${direction}- GENRE:${genre}`)

})
usersRouter


export default usersRouter;