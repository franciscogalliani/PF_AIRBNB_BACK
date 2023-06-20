import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';
import cors from 'cors';
import multer from 'multer';
import sequelize from './db';

const { Rents, Users, Properties } = sequelize.models

interface CustomError extends Error {
    status?: number;
}

const server: Express = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use(
    cors({
      origin: '*',
      credentials: true,
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
      methods: 'GET, POST, OPTIONS, PUT, DELETE',
    })
);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/images')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

server.use(upload.any())

server.use('/', router)

server.use((err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    const status: number | undefined = err.status || 500;
    const message: string | undefined = err.message || err.toString();
    console.error(err);
    res.status(status).send(message)
});

server.post('/rents', async (req, res) => {
    try {
        const { id_user, id_property, start_date, end_date, amount, payment_status, creation_date, active } = req.body;
  
      // Crea una nueva instancia de Rents con los datos recibidos
      const rent = await Rents.create({
        start_date,
        end_date,
        amount,
        payment_status,
        creation_date,
        active,
        id_user,
        id_property
      });

      const user = await Users.findByPk(id_user);
      const property = await Properties.findByPk(id_property);
      if (user && property) {
        await rent.setUser(user);
        await rent.setProperty(property);
      }

      res.status(201).json(rent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default server;