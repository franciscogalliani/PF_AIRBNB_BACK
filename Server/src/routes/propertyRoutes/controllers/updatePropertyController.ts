import sequalize from '../../../db';

const { Properties } = sequalize.models;

const updateProperty = async (id: number, updatedValues: Partial<typeof Properties>) => {
  try {
    await Properties.update(updatedValues, {
      where: {
        id_property: id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export default updateProperty;