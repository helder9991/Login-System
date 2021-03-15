import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';
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
}

class CreateUserService {
    async execute({ nome, email, senha, telefones }: IProps): Promise<User> {
        const userRepository = getRepository(User);

        const userExists = await userRepository.findOne({
            where: { email },
        });

        if (userExists) throw new AppError('E-mail já existente.', 400);

        // Gera a senha em hash
        const hashedPassword = await hash(senha, 8);
        const newUser = userRepository.create({
            nome,
            email,
            senha: hashedPassword,
            telefones,
            ultimo_login: new Date(),
            data_atualizacao: new Date(),
            data_criacao: new Date(),
        });

        // Cria o token
        const { expiresIn, secret } = authConfig.jwt;
        const token = sign({ id: newUser.id }, secret, {
            subject: email,
            expiresIn,
        });

        newUser.token = token;

        await userRepository.save(newUser);

        return newUser;
    }
}

export default new CreateUserService();
