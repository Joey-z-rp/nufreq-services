import { Router } from 'express';
import NumController from '@/controllers/num.controller';
import { SetNumberDto } from '@/dtos/num.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import sessionMiddleware from '@/middlewares/session.middleware';

class NumRoute implements Routes {
  public path = '/num';
  public router = Router();
  public numController = new NumController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get-frequency`, sessionMiddleware, this.numController.getFrequency);
    this.router.post(`${this.path}/set-number`, validationMiddleware(SetNumberDto, 'body'), sessionMiddleware, this.numController.setNumber);
  }
}

export default NumRoute;
