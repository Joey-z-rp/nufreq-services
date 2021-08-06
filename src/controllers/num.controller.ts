import { Response } from 'express';
import { Frequency, RequestWithSessionId } from '@/interfaces/num.interface';
import NumService from '@/services/num.service';

class NumController {
  public numService = new NumService();

  public getFrequency = (req: RequestWithSessionId, res: Response) => {
    const sessionId = req.sessionId;
    const frequency: Frequency = this.numService.getFrequency(sessionId);

    res.status(200).json({ data: { frequency }, message: 'successfully get frequency' });
  };
}

export default NumController;
