import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface IProps {
    email: string;
    senha: string;
}

class AuthenticateUserService {
    async execute({ email, senha }: IProps): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user || !(await compare(senha, user.senha)))
            throw new AppError('Usuário e/ou senha inválidos.', 401);

        user.ultimo_login = new Date();

        await userRepository.save(user);

        return user;
    }
}

export default new AuthenticateUserService();
