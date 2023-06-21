import sequalize from '../../../db';

const { Properties } = sequalize.models;

const deletePropertyById = async (id: number) => {
  try {
    const deletedProperty = await Properties.destroy({
      where: {
        id_property: id,
      },
    });
    return deletedProperty;
  } catch (error) {
    if (typeof error === 'object' && error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export default deletePropertyById;