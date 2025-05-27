declare module 'express-queue' {
    import { RequestHandler } from 'express';
  
    interface QueueOptions {
      activeLimit?: number;
      queuedLimit?: number;
      rejectHandler?: (req: any, res: any) => void;
    }
  
    function queue(options?: QueueOptions): RequestHandler;
  
    export = queue;
  }
  