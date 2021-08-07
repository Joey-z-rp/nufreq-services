import { Frequency, SetNumberResult } from '@/interfaces/num.interface';
import { checkIsFib } from '@/utils/fib';
import { getSessionData, setSessionData } from '@/utils/inMemorySessionStore';

class NumService {
  public getFrequency(sessionId: string): Frequency {
    const frequency = getSessionData(sessionId) || {};

    return frequency;
  }

  public setNumber(sessionId: string, number: number): SetNumberResult {
    const isFib = checkIsFib(number);
    const frequency = getSessionData(sessionId) || {};
    const numOfPresence = frequency[number] || 0;
    const newFrequency = {
      ...frequency,
      [number]: numOfPresence + 1,
    };
    setSessionData(sessionId, newFrequency);

    return { isFib };
  }
}

export default NumService;
