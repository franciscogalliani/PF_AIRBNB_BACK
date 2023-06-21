import sequalize from '../../../db';

const { Users } = sequalize.models;

const updateUser = async (id: string, updatedValues: Partial<typeof Users>) => {
  try {
    await Users.update(updatedValues, {
      where: {
        id_user: id,
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

export default updateUser;