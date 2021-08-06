/**
 * For simplicity sake, I'm using in-memory session store here.
 * In a real application, this should be a proper session solution, e.g redis.
 */

import { Frequency } from '@/interfaces/num.interface';

interface SessionStore {
  [sessionId: string]: Frequency;
}

const sessionStore: SessionStore = {};

export const setSessionData = (sessionId: string, data: Frequency) => {
  sessionStore[sessionId] = data;
};

export const getSessionData = (sessionId: string) => sessionStore[sessionId];
