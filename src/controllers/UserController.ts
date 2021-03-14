import { Request, Response } from 'express';
import * as Yup from 'yup';

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

        if (!(await schema.isValid(req.body)))
            throw new AppError('Erro na validação da requisição.', 400);

        res.json({ message: 'store' });
    }
}

export default new UserController();
