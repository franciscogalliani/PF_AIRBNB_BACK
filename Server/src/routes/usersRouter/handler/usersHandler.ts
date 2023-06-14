import { Request, Response } from "express";
import { getUsers, getUsersById, getUsersByName } from "../controller/getUsersController";



export const getUsersHandler = async(req: Request, res: Response) => {
    const name = req.query.name as string
    const users: any = getUsers()
    try {
        if(name){
            const usersByName = await getUsersByName(name)
            return res.status(200).send(usersByName)
        }
        console.log(users);
        if(users.length) res.status(200).send(users)
        else throw new Error('There is no users')
    } catch (error) {
        const errorMessage = (error as Error).message
        res.status(400).send({error: errorMessage})
    }
}

export const getUsersByIdHandler = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        if(id){
            const userById = await getUsersById(id)
            if(userById) res.status(200).send(userById)
            else throw new Error('There is no user with this id')
        }
    } catch (error) {
        const errorMessage = (error as Error).message
        res.status(400).send({error: errorMessage})
    }
}


export const postUsersHandler = (req: Request, res: Response) => {
    const { name, surname, email, address, gender } = req.body
    res.status(200).send(`POST para crear el usuario ${name},${surname}- EMAIL:${email}- ADDRESS:${address}- GENDER:${gender}`)
}


export const putUsersHandler = (req: Request, res: Response) => {
    const { id } = req.params
    res.status(200).send(`PUT del user con ID = ${id}`)
}