import { Request, Response } from 'express';
import * as Yup from 'yup';

import CreateUserTokenService from '../services/CreateUserTokenService';
import CreateUserService from '../services/CreateUserService';
import AppError from '../errors/AppError';

class UserController {
    index(req: Request, res: Response): void {
        res.json({ message: 'index' });
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

        // Gera o token do usuario
        const token = CreateUserTokenService.execute(req.body);

        // Cria o usuario no banco de dados
        const user = await CreateUserService.execute({ ...req.body, token });

        res.status(201).json(user);
    }
}

export default new UserController();
