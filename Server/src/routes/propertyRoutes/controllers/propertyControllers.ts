
export const getAllPropsController = (name: string | void) => {
    if(name){
        const response = `axios de ${name}`
        return response
    }
    const response = 'axios de algo';
    return response;
}

export const getPropById = (id: number) => {
    const response = `axios del ${id}`
    return response;
};

export const createPropController = (title: string, location: string, id_property: number) => {
    const response = `axios.post de ${title}, ${location}, ${id_property}`;
    return response;
}