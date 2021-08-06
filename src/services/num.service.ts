import { Frequency } from '@/interfaces/num.interface';
import { getSessionData } from '@/utils/inMemorySessionStore';

class NumService {
  public getFrequency(sessionId: string): Frequency {
    const frequency = getSessionData(sessionId) || {};

    return frequency;
  }
}

export default NumService;
