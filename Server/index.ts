import dotenv from 'dotenv';
import server from "./src/app";

dotenv.config();
const PORT: number | undefined = process.env.PORT ? Number(process.env.PORT) : undefined;


server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});