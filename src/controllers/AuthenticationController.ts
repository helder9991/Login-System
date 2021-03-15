import { Request, Response } from 'express';
import * as Yup from 'yup';

import AuthenticateUserService from '../services/AuthenticateUserService';
import AppError from '../errors/AppError';

class AuthenticationController {
    async store(req: Request, res: Response): Promise<void> {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            senha: Yup.string().required(),
        });

        // Verifica se foi enviado corretamente os dados da requisição
        if (!(await schema.isValid(req.body)))
            throw new AppError('Erro na validação da requisição.', 400);

        const user = await AuthenticateUserService.execute(req.body);

        res.status(201).json(user);
    }
}

export default new AuthenticationController();
