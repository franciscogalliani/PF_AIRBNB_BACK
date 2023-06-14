import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';
import cors from 'cors';
import multer from 'multer';


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

export default server;