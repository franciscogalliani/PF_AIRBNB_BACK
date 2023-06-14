import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';
import cors from 'cors'
import fileUpload from "express-fileupload";

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
server.use(fileUpload({

    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

server.use('/', router)

server.use((err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    const status: number | undefined = err.status || 500;
    const message: string | undefined = err.message || err.toString();
    console.error(err);
    res.status(status).send(message)
});

export default server;