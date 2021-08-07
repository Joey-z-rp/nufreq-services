import { Response } from 'express';
import { SetNumberDto } from '@/dtos/num.dto';
import { Frequency, RequestWithSessionId } from '@/interfaces/num.interface';
import NumService from '@/services/num.service';

class NumController {
  public numService = new NumService();

  public getFrequency = (req: RequestWithSessionId, res: Response) => {
    const sessionId = req.sessionId;
    const frequency: Frequency = this.numService.getFrequency(sessionId);

    res.status(200).json({ data: { frequency }, message: 'successfully get frequency' });
  };

  public setNumber = (req: RequestWithSessionId, res: Response) => {
    const sessionId = req.sessionId;
    const { number }: SetNumberDto = req.body;
    const { isFib } = this.numService.setNumber(sessionId, number);

    res.status(200).json({ data: { isFib, sessionId }, message: 'successfully set number' });
  };
}

export default NumController;
