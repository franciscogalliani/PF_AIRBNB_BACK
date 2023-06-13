const createPropController = (title: string, location: string, id_property: number) => {
    const response = `axios.post de ${title}, ${location}, ${id_property}`;
    return response;
}

export default createPropController;
