import { Router } from 'express';
import NumController from '@/controllers/num.controller';
import { Routes } from '@/interfaces/routes.interface';
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
  }
}

export default NumRoute;
