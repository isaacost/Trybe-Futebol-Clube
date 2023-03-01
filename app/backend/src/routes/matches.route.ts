import { IRouter, Router } from 'express';
import MatcheController from '../controllers/matches.controller';
import verificaToken from '../middlewares/token.middleware';

const matcheController = new MatcheController();

const matcheRoutes: IRouter = Router();

matcheRoutes.get('/matches', matcheController.getAll.bind(matcheController));

matcheRoutes.patch(
  '/matches/:id/finish',
  verificaToken,
  matcheController.finished.bind(matcheController),
);

matcheRoutes.patch(
  '/matches/:id',
  verificaToken,
  matcheController.update.bind(matcheController),
);

export default matcheRoutes;
