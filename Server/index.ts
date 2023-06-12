import dotenv from 'dotenv';
import server from "./src/app";
import sequelize from './src/db' 

dotenv.config();
const PORT: number | undefined = process.env.PORT ? Number(process.env.PORT) : undefined;



server.listen(PORT, () => {
    sequelize.sync({ force: true })
    console.log(`Server listening at ${PORT}`);
});