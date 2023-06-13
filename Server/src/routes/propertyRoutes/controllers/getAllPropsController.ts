const getAllPropsController = (name: string | void) => {
    if(name){
        const response = `axios de ${name}`
        return response
    }
    const response = 'axios de algo';
    return response;
}

export default getAllPropsController;


