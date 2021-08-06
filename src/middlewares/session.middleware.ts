import { NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestWithSessionId } from '@/interfaces/num.interface';

const sessionMiddleware = (req: RequestWithSessionId, res: Response, next: NextFunction) => {
  const sessionId: string = req.header('nufreq-session-id') || uuidv4();
  req.sessionId = sessionId;

  next();
};

export default sessionMiddleware;
