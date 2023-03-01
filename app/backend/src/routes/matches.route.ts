import { IRouter, Router } from 'express';
import MatcheController from '../controllers/matches.controller';

const matcheController = new MatcheController();

const matcheRoutes: IRouter = Router();

matcheRoutes.get('/matches', matcheController.getAll.bind(matcheController));

export default matcheRoutes;
