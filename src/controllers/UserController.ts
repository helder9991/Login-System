import { Request, Response } from 'express';
import * as Yup from 'yup';

import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';
import AppError from '../errors/AppError';

class UserController {
    async show(req: Request, res: Response): Promise<void> {
        const { user_id } = req.params;

        const authHeader = req.headers.authorization;

        // Verifica se o token existe
        if (!authHeader) throw new AppError('Não autorizado.', 401);

        const [, token] = authHeader.split(' ');

        const user = await ShowUserService.execute({ token, user_id });

        res.json(user);
    }

    async store(req: Request, res: Response): Promise<void> {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required(),
            telefones: Yup.array()
                .of(
                    Yup.object().shape({
                        numero: Yup.string().required(),
                        ddd: Yup.string().required(),
                    }),
                )
                .required(),
        });

        // Verifica se foi enviado corretamente os dados da requisição
        if (!(await schema.isValid(req.body)))
            throw new AppError('Erro na validação da requisição.', 400);

        // Cria o usuario no banco de dados
        const user = await CreateUserService.execute({ ...req.body });

        res.status(201).json(user);
    }
}

export default new UserController();
