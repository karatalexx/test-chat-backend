import express, { Application, Router } from 'express';
import http, { Server } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import io from 'socket.io';
import { routes } from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { ChatService } from './services/chat/chat.service';

export class App {
  public app: Application = express();
  public server!: Server;
  public ioService!: any;
  protected env = process.env;

  /**
   * Config servers
   */
  public config(): void {
    // Set middleware
    this.app.use([bodyParser.urlencoded({ extended: true }), bodyParser.json(), helmet(), cors()]);

    // Set routes
    this.app.use('/api/v1', routes(Router({ caseSensitive: true })));
    this.app.use(errorMiddleware);
  }

  /**
   * Start server
   */
  public async start(): Promise<Server> {
    this.config();
    const server = await this.create();
    this.ioService = await new ChatService(io(server)).main();

    return server;
  }

  /**
   * Create servers
   */
  public async create(): Promise<Server> {
    return new Promise<Server>((resolve, reject) => {
      this.server = http
        .createServer(this.app)
        .listen(parseInt(this.env.HTTP_PORT), this.env.HTTP_HOST)
        .once('listening', () => resolve(this.server))
        .on('error', (e: NodeJS.ErrnoException) => reject(e));
    });
  }

  /**
   * Close server
   */
  public close(): void {
    this.server.close(() => {
      console.log('HTTP server is closed');
    });
  }
}
