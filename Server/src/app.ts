import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';

interface CustomError extends Error {
    status?: number;
}

const server: Express = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', router)

server.use((err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    const status: number | undefined = err.status || 500;
    const message: string | undefined = err.message || err.toString();
    console.error(err);
    res.status(status).send(message)
});

export default server;