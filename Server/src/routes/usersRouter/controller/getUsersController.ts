import User from "../../../db"

export const getUsers =  () => {
        //Es una prueba, cuando tengamos toda la bd se hace con  User.findAll().
        const users = 'Trae a todos los User de la bd'
        return users
    }

export const getUsersById =(id: string)=>{
    //es una prueba, cuando tengamos la bd se hace con User.findByPk(id)
    if(id){
        const user = `Trae a el usuario con id = ${id}`
        return user
    }
    else throw Error("El ID no existe o es nulo")

}


export const getUsersByName = async(name:string)=>{
    //Es una prueba, cuando tenga la bd se realiza con User.findAll({where{name:name}})
    const usersByName = `Trae a todos los Users de la bd que tengan name = ${name}`
    return usersByName
}