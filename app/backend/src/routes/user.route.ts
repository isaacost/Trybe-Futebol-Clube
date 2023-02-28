import { IRouter, Router } from 'express';
import UserController from '../controllers/user.controller';
import verificaLogin from '../middlewares/login.middleware';
import verificaToken from '../middlewares/token.middleware';

const userController = new UserController();

const userRoutes: IRouter = Router();

userRoutes.post('/login', verificaLogin, userController.login.bind(userController));

userRoutes.get('/login/role', verificaToken, UserController.getRole);

export default userRoutes;
