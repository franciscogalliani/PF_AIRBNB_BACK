import { Request, Response } from "express";



export const getUsersHandler = (_req: Request, res: Response) => {
    res.status(200).send("GET de todos los usuarios")
}

export const getUsersByIdHandler = (req: Request, res: Response) => {
    const { id } = req.params
    res.status(200).send(`GET del user con ID = ${id}`)
}


export const postUsersHandler = (req: Request, res: Response) => {
    const { name, surname, email, address, gender } = req.body
    res.status(200).send(`POST para crear el usuario ${name},${surname}- EMAIL:${email}- ADDRESS:${address}- GENDER:${gender}`)
}


export const putUsersHandler = (req: Request, res: Response) => {
    const { id } = req.params
    res.status(200).send(`PUT del user con ID = ${id}`)
}