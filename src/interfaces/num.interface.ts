import { Request } from 'express';

export interface Frequency {
  [k: number]: number;
}

export interface SetNumberResult {
  isFib: boolean;
}

export interface RequestWithSessionId extends Request {
  sessionId: string;
}
