import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface IProps {
    nome: string;
    email: string;
    senha: string;
    telefones: [
        {
            numero: string;
            ddd: string;
        },
    ];
    token: string;
}

class CreateUserService {
    async execute({
        nome,
        email,
        senha,
        telefones,
        token,
    }: IProps): Promise<User> {
        const userRepository = getRepository(User);

        const userExists = await userRepository.findOne({
            where: { email },
        });

        if (userExists) throw new AppError('E-mail já existente.', 400);

        const hashedPassword = await hash(senha, 8);
        const newUser = userRepository.create({
            nome,
            email,
            senha: hashedPassword,
            telefones,
            ultimo_login: new Date(),
            data_atualizacao: new Date(),
            data_criacao: new Date(),
            token,
        });

        await userRepository.save(newUser);

        return newUser;
    }
}

export default new CreateUserService();
