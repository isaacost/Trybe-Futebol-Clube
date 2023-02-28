import { IRouter, Router } from 'express';
import MatcheController from '../controllers/matches.controller';

const matcheController = new MatcheController();

const matcheRoutes: IRouter = Router();

matcheRoutes.get('/matches', matcheController.get.bind(matcheController));

export default matcheRoutes;
